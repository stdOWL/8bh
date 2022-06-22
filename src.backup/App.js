import React, { useEffect } from 'react'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { Home, Withdraw, AccountSecurity, Deposit, Game, Login, Register, ResetPassword, Player } from './views'
import { Routes, Route, useLocation } from 'react-router-dom'
import { store, token } from "./util";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
export default function App() {
  const { pathname } = useLocation()
  let page = pathname.split('/')[1].toLowerCase()

  useEffect(() => {

    page = page.charAt(0).toUpperCase() + page.slice(1)

    document.title = `8BetHub | ${page || 'Home'}`

  }, [pathname])


  return (

    <Provider store={store}>
      <ToastContainer />
      <Routes>
        {
          routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))
        }
      </Routes>
      <Footer />
    </Provider>
  )
}

const routes = [
  { id: 0, nav: true, path: '/', element: <Home /> },

  { id: 5, nav: true, path: '/Login', element: <Login /> },
  { id: 6, nav: true, path: '/Register', element: <Register /> },
  { id: 7, nav: true, path: '/RessetPassword', element: <ResetPassword /> },
  { id: 1, nav: false, path: '/AccountSecurity', element: <AccountSecurity /> },

  { id: 2, nav: false, path: '/Deposit', element: <Deposit /> },
  { id: 3, nav: false, path: '/Withdraw', element: <Withdraw /> },
  { id: 4, nav: false, path: '/Game', element: <Game /> },
  { id: 8, nav: false, path: '/Player', element: <Player /> },
]
