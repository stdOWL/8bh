import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.scss'



export default function AccountDeletion() {
    return (
        <Row className='account-deletion'>
            <Col lg={6} className='desc'>
                <p>
                    Deleting your account will make it permanently inaccessible and remove its profile page. Your bets and chat messages will still be visible. The user name will not become available again.
                </p>
            </Col>
            <Col lg={6}>
                <div className='form-group'>
                    <div className='label'>Password<span className='require-field'>*</span></div>
                    <input placeholder='Enter password' />
                </div>
                
                <button className="danger-btn">
                    Delete Account
                </button>
            </Col>
        </Row>
    )
}
