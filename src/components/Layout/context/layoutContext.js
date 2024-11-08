import { createContext, useState, useContext, useMemo } from "react";
import { useMediaQuery } from 'react-responsive'

const LayoutContext = createContext(null)



export default function LayoutProvider({ children }) {

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' })
    const [openChat, setOpenChat] = useState(false)
    const [loginModalShow, setLoginModalShow] = useState(false)
    const [registerModalShow, setRegisterModalShow] = useState(false)
    


    const value = useMemo(() => {
        return {
            openChat,
            setOpenChat,
            isLargeScreen,
            loginModalShow, setLoginModalShow,
            registerModalShow, setRegisterModalShow,
        }
    }, [isLargeScreen, loginModalShow, openChat, registerModalShow])

    return (
        <LayoutContext.Provider value={value}>

            {children}
        </LayoutContext.Provider>
    )
}


export const useLayout = () => useContext(LayoutContext)