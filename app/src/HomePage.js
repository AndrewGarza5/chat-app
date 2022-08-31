import React, { useEffect, useState, useRef } from 'react'
import './styles/home-page.css'
import ChatBox from './ChatBox';
import useLocalStorage from './hooks/useLocalStorage';
import {v4 as uuidV4} from 'uuid'
const { io } = require("socket.io-client")


export default function HomePage() {

  const [chatterID, setChatterID] = useLocalStorage()
  const chatRef = useRef()
  let room = 'wtf'


  //const socket = io('http://localhost:5000')

  function joinChat(){

    let newID = uuidV4()
    setChatterID(newID)
    const chatterName = document.getElementById('enter-name').value
    const chatRoomName = document.getElementById('enter-chat-room').value
    
    let socket = io('http://localhost:5000', { query: { chatRoomName } })

    chatRef.current = <ChatBox 
                        chatterID={newID} 
                        chatterName={chatterName}
                        chatRoomName={chatRoomName}
                        socket={socket}
                      />
  
    
  }

  return (
    <div className="home-page-wrapper">
      <input id='enter-name' className='enter-name' placeholder='enter name'></input>
      <input id='enter-chat-room' className='enter-chat-room' placeholder='enter chat room'></input>
      
      <div className='join-chat' onClick={joinChat}>
        JOIN CHAT
      </div>
      <div className='your-id'>
        Your ID: <span>{chatterID}</span>
      </div>
      {chatRef.current}
    </div>
  );
}