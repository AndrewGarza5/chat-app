import React, { useEffect, useState } from 'react'
// import './styles/chat-box.css'

export default function MessageFormInlineText ({ text }) {
    const [currentText, setCurrentText] = useState('')

    useEffect(() => {
        setCurrentText(text)
    })

    function testy(){
        console.log(9999)
    }

    return (
        <span className='tetsy'>
            {currentText}
        </span>
        
    )
}

