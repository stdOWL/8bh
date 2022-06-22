import React from 'react'
import googleIcon from '../../../../assets/imgs/google.svg'
import facebookIcon from '../../../../assets/imgs/facebook.svg'
import telegramIcon from '../../../../assets/imgs/telegram.svg'
import walletConnectIcon from '../../../../assets/imgs/walletconnect.svg'
import metamaskIcon from '../../../../assets/imgs/metamask.svg'
import './style.scss'

export default function Footer() {
    const login = (name) => {
        alert(`Login with ${name}`)
    }

    return false && (
        <div className='auth-layout-footer'>
            <div className="label login-with">Log in directly with</div>
            <div className="login-methods">
                {
                    loginMethods.map((item, index) => (
                        <img
                            key={index}
                            onClick={() => login(item.name)}
                            src={item.icon}
                        />
                    ))
                }

            </div>
        </div>
    )
}


const loginMethods = [
    { id: 0, icon: googleIcon, name: 'Google' },
    { id: 1, icon: facebookIcon, name: 'Facebook' },
    { id: 2, icon: telegramIcon, name: 'Telegram' },
    { id: 3, icon: walletConnectIcon, name: 'Wallet Connect' },
    { id: 4, icon: metamaskIcon, name: 'Metamask' },
]