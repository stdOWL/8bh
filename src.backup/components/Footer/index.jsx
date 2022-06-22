import React from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import dicelogo from '../../assets/imgs/dicelogo.svg'
import './style.scss'

export default function Footer() {
    return (
        <div className='footer'>
            <Row className='justify-content-center'>
                <Col md={11}>
                    <Container>
                        <Row>
                            <Col lg={6}  className='left'>
                                <Row>
                                    <Col lg={10}>
                                        <Image
                                            src={dicelogo}
                                            alrt='dice logo'
                                        />
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim pellentesque integer egestas morbi.consectetur adipiscing elit. Nunc dignissim.
                                        </p>
                                        <div className="links">
                                            <a href="#">bitcointalk.org</a>
                                            <a href="#">Twitter</a>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6} className='right'>
                                <Row>
                                    <div className='col-6 col-md-5'>
                                        <h6>casino</h6>
                                        <div className="links">
                                            <a href="#">Leaderboard</a>
                                            <a href="#">Invest</a>
                                            <a href="#">Statistics</a>
                                            <a href="#">Patch notes</a>
                                            <a href="#">Verify fairness</a>
                                        </div>
                                    </div>
                                    <div className='col-6 col-md-7 help'>
                                        <h6>help</h6>
                                        <div className="links">
                                            <a href="#">Frequently asked questions</a>
                                            <a href="#">Support</a>
                                            <a href="#">Contact us</a>
                                            <a href="#">Terms of Service</a>
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}
