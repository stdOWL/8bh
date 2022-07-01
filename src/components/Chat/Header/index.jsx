import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useLayout } from '../../Layout/context/layoutContext'
import './style.scss'

export default function Header() {
    const [language, setLanguage] = useState('English')
    const { setOpenChat } = useLayout()


    return (
        <div className="chat-header">
            <span className='close-chat' onClick={() => setOpenChat(false)}>
                <svg viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.39656 1.12842L1.49206 7.22545C1.11654 7.61322 1.11654 8.22903 1.49206 8.61679L7.39656 14.7138" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Chat
            </span>
            {false && (<span>
                <Dropdown>
                    <Dropdown.Toggle>{language}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            languages.map((lang, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => setLanguage(lang.name)}
                                >
                                    {lang.name}
                                </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </span>)}
        </div>
    )
}



const languages = [
    { id: 0, name: 'English' },
    { id: 1, name: 'Deutsch' },
    { id: 2, name: 'French' },
]
