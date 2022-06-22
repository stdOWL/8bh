import React from 'react'
import Main from './Main'
import Layout from '../Layout'
import ModalProvider from '../context/modalContext'
import './style.scss'


export default function Login() {


    return (
        <ModalProvider>
            <Layout>
                <Main />
            </Layout>
        </ModalProvider>
    )
}
