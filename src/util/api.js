import axios from 'axios'

import { env } from '../common'
import { logEvent } from './logger'
import TokenService from './token'

const exponentialDelay = (retryNumber = 0) => {
    return Math.min(10000, Math.pow(2, retryNumber) * 500)
}

const nonRetryCodes = [
    1001, // Not enough balance
]

export const api = axios.create({
    timeout: 1000 * 10 * 10, // need a higher timeout for ACP at least
    baseURL: env.API_URL,
    withCredentials: true,
    headers: {
        'accept-language': global.window ? localStorage.getItem('i18nextLng') : 'en',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 406 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await api.post("/auth/refresh-tokens", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const { access, refresh } = rs;
                    TokenService.updateLocalAccessToken(access.token, refresh.token);
                    return api(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

api.interceptors.request.use(
    config => {
        if (config.retries) {
            config.retries.retryCount = config.retries.retryCount || 0
        }
        config.headers = {
            ...config.headers,
            'accept-language': global.window ? localStorage.getItem('i18nextLng') : 'en',
        }
        return config
    },
    _ /* err */ => { },
)

api.interceptors.response.use(
    response => {
        return response.data
    },
    function (err, _ /* extra */) {
        const config = err.config
        const retries = config.retries
        // Do not retry if we match a certain error code (e.g. not enough balance)
        const shouldRetry =
            (retries && (retries.retryCount < retries.maxRetries)) &&
            !(typeof err?.response?.data?.code !== 'undefined' && nonRetryCodes.includes(err.response.data.code))

        if (err?.response?.data) {
            err.message = err.response.data
            //events.emit('api:error', err.response.data)
        }

        if (shouldRetry) {
            config.retries.retryCount++
            return new Promise((resolve, reject) =>
                setTimeout(
                    () => api(config).then(resolve, reject),
                    exponentialDelay(config.retries.retryCount),
                ),
            )
        }

        if (err?.response?.data?.code) {
            return Promise.reject({
                response: {
                    status: err.response.status,
                    data: err.response.data.message,
                },

                ...err.response.data,
            })
        }

        if (!err?.response?.data) {
            if (err?.response?.status === 429) {
                return Promise.reject({
                    response: {
                        data: 'Please slow down and try again',
                    },
                })
            }

            logEvent('API Error', {
                extra: {
                    method: err.config.method,
                    url: err.config.url,
                },
            })

            return Promise.reject({
                error: err,

                config: {
                    method: err.config.method,
                    url: err.config.url,
                },

                response: {
                    data: 'Please try again later',
                },
            })
        }

        return Promise.reject(err)
    },
)
