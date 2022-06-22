import React from 'react'
import Header from './Header'
import How from './How'
import Trust from './Trust'
import Footer from './Footer'
import Layout from '../../components/Layout'
import './style.scss'


export default function Home() {
    return (
        <div className='home'>
            <Layout title={null} container={false} history={false}>
                <Header />
                <How />
                <Trust />
                <Footer />
            </Layout>
        </div>
    )
}
