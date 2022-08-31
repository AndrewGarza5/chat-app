import React, { useEffect, useState } from 'react'
// import './styles/chat-box.css'

// 55898e122612142e6aaa935b

export default function MessageFormInlineEmote ({ emoteID }) {
    return (
        <span>
            <img src={'https://cdn.betterttv.net/emote/' + emoteID + '/2x'} className='chat-box-emote'></img>
        </span>
        
    )
}

