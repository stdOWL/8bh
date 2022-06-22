import { env } from '../common'
import { toast } from 'react-toastify'
import {
    store, api, token
} from '../util'
import { setUser, logout, updateBalance, setSelectedAssetCode } from '../reducers/user'
export const setAccount = async (user) => {
    store.dispatch(setUser(user))
}
export const updateUserBalance = async (assetCode, balance) => {
    store.dispatch(updateBalance({ assetCode, balance }))
}

export const updateSelectedAssetCode = async (assetCode) => {
    store.dispatch(setSelectedAssetCode({ assetCode }))
}

export const setLogout = async () => {
    store.dispatch(logout())
    token.removeUser();
}
export const getAccount = async () => {
    try {
        const { balances, user } = await api('/account/get');
        user.balances = balances;
        store.dispatch(setUser(user))
        return user
    } catch (err) {
        if (err.code === 401) {
            setLogout();
        }
        return undefined
    }
}



export const endSession = (everywhere = false) => {
    const path = everywhere ? '/auth/logoutEverywhere' : '/auth/logout'
    window.location.href = env.API_URL + path
}