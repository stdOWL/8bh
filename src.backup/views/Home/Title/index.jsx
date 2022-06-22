import React from 'react'
import curvyLine from '../../../assets/imgs/curvy-vector.svg'
import { Row, Col } from 'react-bootstrap'
import './style.scss'

export const BoxTitle = ({ title }) => {
    return (
        <Row className='home-title'>
            <Col sm={7} md={8} lg={7} xl={6} className='col-10 box'>
                <h1 className='mx-auto'>
                    {title}
                    <img src={curvyLine} />
                </h1>
            </Col>
        </Row>
    )
}

export const SmallBoxTitle = ({ title }) => {
    return (
        <Row className='home-title small-box'>
            <Col sm={5} md={6} lg={11} xl={8} className='col-8 box'>
                <h1 className='mx-auto'>
                    {title}
                    <img src={curvyLine} />
                </h1>
            </Col>
        </Row>
    )
}



export const SmallTitle = ({ children, line }) => {
    return (
        <div className={`small-title ${line}`}>
            {children}
        </div>
    )
}
