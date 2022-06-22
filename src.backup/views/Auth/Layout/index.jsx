import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Modal } from 'react-bootstrap'
import Home from '../../Home'
import { useModal } from '../context/modalContext'
import './style.scss'


export default function Layout({ children }) {
  const { show, setShow } = useModal()
  const isDesktopOrTablet = useMediaQuery({ query: '(min-width: 768px)' })


  useEffect(() => {
    setShow(true)
  }, [isDesktopOrTablet])


  return (
    <>
      {
        isDesktopOrTablet
          ?
          <>
            <Home />
            <Modal
              show={show}
              onHide={() => setShow(false)}
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
