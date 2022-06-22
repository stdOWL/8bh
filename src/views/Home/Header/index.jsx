import React from 'react'
import { Col, Row } from 'react-bootstrap'
import bankroll from '../../../assets/imgs/bankroll.png'
import coldstorage from '../../../assets/imgs/cold-storage.png'
import fairness from '../../../assets/imgs/fairness.png'
import highlimits from '../../../assets/imgs/high-limits.png'
import instantdeposit from '../../../assets/imgs/instant-deposit.png'
import ellipse from '../../../assets/imgs/ellipse.png'
import { BoxTitle } from '../Title'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import './style.scss'


export default function Head() {
    const navigate = useNavigate();

    return (
        <div className='head'>
            <Container>
                <span className='small-title'>Next Generation Dice</span>
                <div className="box-title">
                    <BoxTitle title='8BetHub' />
                </div>

                <Row className='items justify-content-lg-between'>
                    {
                        items.map((item, index) => (
                            <Col key={index} lg={2} className='col-4 item mb-lg-0'>
                                <div className="icon-group">
                                    <img src={item.icon} alt={item.text} />
                                    <img src={ellipse} className='ellipse' />
                                </div>
                                <span>{item.text}</span>
                            </Col>
                        ))
                    }
                </Row>

                <button onClick={() => navigate("/game")} className='primary-btn play-button'>
                    <span>Play</span>
                    <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1849 8.6295L7.29519 16.5192L5.99902 15.2231L13.8879 7.33333H6.93494V5.5H17.0183V15.5833H15.1849V8.6295Z" fill="white" />
                    </svg>
                </button>
            </Container>

            <div className="gradientback" />
        </div>
    )
}



const items = [
    { text: 'Instant deposits available', icon: instantdeposit },
    { text: 'High limits', icon: highlimits },
    { text: 'Advanced provable fairness', icon: fairness },
    { text: 'Be the bankroll', icon: bankroll },
    { text: 'Multisignature cold storage', icon: coldstorage }
]