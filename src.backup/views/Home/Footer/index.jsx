import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BoxTitle, SmallTitle } from '../Title'
import './style.scss'


export default function Footer() {
    return (
        <div className="home-footer">
            <Container>
                <BoxTitle title='8bethub' />

                <SmallTitle line='medium'>
                    <h2>Still have question?</h2>
                </SmallTitle>

                <p>
                    Check out our
                    <Link to='/'> FAQ </Link>
                    and our
                    <Link to='/'> bitcointalk.org thread </Link>
                    or
                    <Link to='/'> Reach out to us! </Link>
                </p>

                <Row className='play-row'>
                    <Col lg={5} className='col-10'>
                        <button className='primary-btn'>
                            <span>Play</span>
                            <svg viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1849 8.6295L7.29519 16.5192L5.99902 15.2231L13.8879 7.33333H6.93494V5.5H17.0183V15.5833H15.1849V8.6295Z" fill="white" />
                            </svg>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
