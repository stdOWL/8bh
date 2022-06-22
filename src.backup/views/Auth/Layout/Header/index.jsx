import React from 'react'
import { Row } from 'react-bootstrap'
import dicelogo from '../../../../assets/imgs/logo/icon.png'
import loginbtcgroup from '../../../../assets/imgs/loginbtcgroup.svg'
import './style.scss'

export default function Header({ title }) {
    return (
        <div className='auth-layout-header'>
            <div className="group-bg"></div>
            <div className="logo">
                <img src={dicelogo} />
                <span>8bethub</span>
            </div>
            <Row className='logingroup align-items-center'>
                <div className='col-6 desc'>
                    Now, Bet with
                    8bethub, and
                    Build profit.
                </div>

                <div className='col-6 btcimg'>
                    <img src={loginbtcgroup} />
                </div>
            </Row>
            <h1>{title}</h1>
        </div>
    )
}
