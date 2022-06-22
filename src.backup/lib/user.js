import { env } from '../common'
import { toast } from 'react-toastify'
import {
    store, api, token
} from '../util'
import { setUser, logout } from '../reducers/user'
export const setAccount = async (user) => {
    store.dispatch(setUser(user))
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

        }
        return undefined
    }
}



export const endSession = (everywhere = false) => {
    const path = everywhere ? '/auth/logoutEverywhere' : '/auth/logout'
    window.location.href = env.API_URL + path
}