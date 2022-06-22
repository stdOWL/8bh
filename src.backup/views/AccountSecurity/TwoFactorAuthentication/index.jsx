import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import qrcode from '../../../assets/imgs/qrcode.png'
import { Link } from 'react-router-dom'
import './style.scss'


export default function TwoFactorAuthentication() {
    return (
        <Row className='two-factor-authentication'>
            <Col md={4} className='qrcode'>
                <Image
                    src={qrcode}
                    alt='Qr Code'
                />
            </Col>
            <Col md={8} classNmae='enable'>
                <div className="desc">
                    <p>
                        Scan the QR code or enter the secret into your 2FA app manually, then enter a code to enable two-factor authentication.
                    </p>
                    <p>
                        Without your 2FA code, you might lose access to your account! Do not enable 2FA until you've created a backup of your 2FA app, the QR code or the secret.
                    </p>
                </div>
               
                <div className='form-group otp'>
                    <div className='label'>One-time password</div>
                    <input placeholder='Enter otp' />
                </div>
                <button className="primary-btn">
                    Enable 2FA
                </button>
            </Col>
        </Row>
    )
}
