import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Modal } from 'react-bootstrap'
import Home from '../../Home'
import { useModal } from '../context/modalContext'
import './style.scss'


export default function Layout({ children }) {
  const { loginShow, setLoginShow, registerShow, setRegisterShow } = useModal()
  const isDesktopOrTablet = useMediaQuery({ query: '(min-width: 768px)' })


  useEffect(() => {
    setLoginShow(true)
  }, [isDesktopOrTablet])


  return (
    <>
      {
        isDesktopOrTablet
          ?
          <>
            <Home />
            <Modal
              show={loginShow}
              onHide={() => setLoginShow(false)}
              centered
            >
              {children}
            </Modal>
          </>

          : <>{children}</>
      }
    </>
  )
}
