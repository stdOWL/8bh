import React from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Header from '../Layout/Header'
import Sent from './Sent'
import './style.scss'


export default function ResetPassword() {
    const [sent, setSent] = useState()



    const sendResetLInk = () => {
        ///apicall

        setSent(true)
    }

    return (
        <div className="reset-password">
            <Modal.Body>
                {
                    sent
                        ? <Sent closeSent={() => setSent(false)} />
                        : <>
                            <Header title='Request password reset' />

                            <div className="form-group">
                                <p>Forgot your password? Not a problem if you set a recovery email address!</p>
                                <p>Enter your email address and we'll send you a reset link.</p>
                            </div>



                            <div className='form-group last'>
                                <div className='label'>Email address<span className='require-field'>*</span></div>
                                <input placeholder='Enter valid email address' />
                            </div>

                            <button onClick={sendResetLInk} className='primary-btn'>Send reset link</button>
                        </>
                }
            </Modal.Body>
        </div>

    )
}
