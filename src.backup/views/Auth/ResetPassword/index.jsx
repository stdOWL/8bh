import React from 'react'
import Main from './Main'
import Layout from '../Layout'
import './style.scss'
import ModalProvider from '../context/modalContext'

export default function ResetPassword() {


    return (
        <ModalProvider>
            <Layout>
                <Main />
            </Layout>
        </ModalProvider>

    )
}
