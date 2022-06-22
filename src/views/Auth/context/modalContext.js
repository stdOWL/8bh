import { createContext, useContext, useState } from "react";


const ModalContext = createContext(null)




export default function ModalProvider({ children }) {
    const [loginShow, setLoginShow] = useState(true)
    const [registerShow, setRegisterShow] = useState(true)


    return (
        <ModalContext.Provider value={{ loginShow, setLoginShow, registerShow, setRegisterShow }} >
            {children}
        </ModalContext.Provider>
    )
}


export const useModal = () => useContext(ModalContext)