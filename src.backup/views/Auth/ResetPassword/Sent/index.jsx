import React from 'react'
import dicelogo from '../../../../assets/imgs/dicelogo.svg'
import success from '../../../../assets/imgs/success.png'
import { useModal } from '../../context/modalContext'
import './style.scss'

export default function Sent({ closeSent }) {
  const { setShow } = useModal()

  const close = () => {
    setShow(false)
    closeSent()
  }


  return (
    <div className='sent'>

      <div className="header">

        <div className="logo">
          <img src={dicelogo} />
          <span>8bethub</span>
        </div>

        <div className='success'>
          <img src={success} />
        </div>
      </div>

      <p className='success-text'>
        Successfully sent the reset link, please follow instruction etc.
      </p>

      <button onClick={close} className='primary-btn'>Close</button>


    </div>
  )
}
