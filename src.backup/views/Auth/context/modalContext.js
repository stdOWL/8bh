import { createContext, useContext, useState } from "react";


const ModalContext = createContext(null)





export default function ModalProvider({ children }) {
    const [show, setShow] = useState(true)

    return (
        <ModalContext.Provider value={{ show, setShow }} >
            {children}
        </ModalContext.Provider>
    )
}


export const useModal = () => useContext(ModalContext)