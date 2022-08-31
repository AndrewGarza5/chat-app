import React, { useEffect, useState, useRef } from 'react'
import './styles/chat-box.css'
import {v4 as uuidV4} from 'uuid'
import MessageForm from './MessageForm'
import ChatBoxMessage from './ChatBoxMessage'
import axios from 'axios'
const { io } = require("socket.io-client")

class Message {
    constructor(chatterName, message, messageID){
        this.chatterName = chatterName
        this.message = message
        this.messageID = messageID
    }

    getMessage(){
        return (this.message)
    }
}

export default function ChatBox({ chatterID, chatterName, chatRoomName, socket }) {

    const [chatMessages, setChatMessages] = useState([])
    const emoteList = useRef([])

    useEffect(() => {
        socket.on('recieveMessageFromChatter', ({ messageID, messageJSON }) => {
            const tempChatMessagesList = chatMessages.slice()
            tempChatMessagesList.push({key: messageID, messageJSON: messageJSON})
            setChatMessages(tempChatMessagesList)
        })

        async function getEmoteListFromAPI(){
            emoteList.current = await axios.get('http://localhost:5000/api/v1/emote/emote-list')
        }

        getEmoteListFromAPI()
        


    })



    function sendMessage(fullMessageProcessedArray, fullMessageRawText){ 
        console.log(fullMessageProcessedArray + ' --- ' + fullMessageRawText)

        const messageID = uuidV4()
        const messageJSON = {
            chatterID: chatterID, 
            chatterName: chatterName,
            fullMessageProcessedArray: fullMessageProcessedArray,
            fullMessageRawText: fullMessageRawText, 
            key: messageID
        }
        const tempChatMessagesList = chatMessages.slice()
        tempChatMessagesList.push({key: messageID, messageJSON: messageJSON})
        setChatMessages(tempChatMessagesList)

        socket.emit('sendMessageToChat', { messageID, messageJSON, chatRoomName }, ()=>{
            // console.log(message.getMessage())
        })
    }


    return (
        <div className="chat-box-container">
            <div className='chat-box-name'>

            </div>
            <div id='chat-box-feed' className='chat-box-feed'>
                {chatMessages.map(chatMessage => {
                    
                    return <ChatBoxMessage
                        {...chatMessage}
                        messageID={chatMessage.key}
                        messageJSON={chatMessage.messageJSON}
                    />
                })}
            </div>
            <MessageForm sendMessage={sendMessage} emoteList={emoteList}/>
        </div>
    );
}