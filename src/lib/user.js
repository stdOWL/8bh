import { env } from '../common'
import { toast } from 'react-toastify'
import {
    store, api, token
} from '../util'
import { setUser, logout, updateBalance, setSelectedAssetCode } from '../reducers/user'
import { setLoadingState } from '../reducers/general'


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
        store.dispatch(setLoadingState("Loading"))



        const { balances, user } = await api('/account/get');
        console.log("getAccount", balances, user)


        user.balances = balances;
        ;
        try {
            if (typeof window.Tawk_API.setAttributes !== "undefined") {
                window.Tawk_API.setAttributes(
                    {
                        name: user.username
                    },
                    function (err) { }
                );

            } else {
                window.Tawk_API.onLoad = function () {
                    console.log('onload', user.username, user.email);
                    window.Tawk_API.setAttributes(
                        {
                            name: user.username
                        },
                        function (err) {
                        }
                    );
                };


            }
        } catch (err) {

        }


        store.dispatch(setUser(user))
        return user
    } catch (err) {
        console.error("getAccount", err)
        if (err.code === 401) {
            setLogout();
        }
        return undefined
    }finally{
        store.dispatch(setLoadingState(false))


    }
}



export const endSession = (everywhere = false) => {
    const path = everywhere ? '/auth/logoutEverywhere' : '/auth/logout'
    window.location.href = env.API_URL + path
}