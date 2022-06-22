import React from 'react'
import { Col, Row } from 'react-bootstrap'
import curvyLine from '../../../assets/imgs/curvyLine.svg'
import './style.scss'

export default function Title({ openChat }) {
    return (
        <Row className='game-title justify-content-center'>
            <Col md={6} lg={openChat ? 5 : 4} className='col-8 box'>
                <h1 className='mx-auto'>
                    1.00X
                    <img src={curvyLine} />
                </h1>
            </Col>
        </Row>
    )
}
