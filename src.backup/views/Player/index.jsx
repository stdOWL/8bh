import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Row, Col } from 'react-bootstrap'
import refreshIcon from '../../assets/imgs/refresh-2.svg'
import './style.scss'
import Chart from './Chart'

export default function Player() {
    const [loading, setLoading] = useState(false)

    const stopAutoUpdate = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }


    return (
        <div className='player'>
            <Layout title='Player: stdowl'>
                <div className="player-box">
                    <Row className="stats justify-content-between">
                        <Col md={2} className="col-4 form-group">
                            <div className="label">Wagered</div>
                            <span>9 bits</span>
                        </Col>
                        <Col md={2} className="col-4 form-group">
                            <div className="label">Profit</div>
                            <span>9 bits</span>
                        </Col>
                        <Col md={2} className="col-4 form-group">
                            <div className="label">Profit ATL</div>
                            <span>1.98 bits</span>
                        </Col>
                        <Col md={2} className="col-4 form-group">
                            <div className="label">Profit ATH</div>
                            <span>1.04 bits</span>
                        </Col>
                        <Col md={2} className="col-8 form-group">
                            <div className="label">Bets</div>
                            <span>9</span>
                        </Col>
                    </Row>
                    <Row className="profit">
                        <Col className='mt-2'>
                            <h4>Net profit over time</h4>
                        </Col>

                        <Col className='mt-2'>
                            <div className="options">
                                <button>Tip stdowl</button>
                                <button>Add stdowl as friend</button>
                                <button>Ignore stdowl</button>
                            </div>
                        </Col>

                        <Col className='mt-2'>
                            <div className="auto-update" onClick={stopAutoUpdate}>
                                <img src={refreshIcon} className={loading && 'refresh-active'} />
                                <span>Stop automatic update</span>
                            </div>
                        </Col>
                    </Row>
                    <Chart />
                </div>
            </Layout>
        </div>
    )
}
