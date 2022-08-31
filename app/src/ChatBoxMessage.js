import React, { useEffect, useState } from 'react'
import './styles/chat-box.css'
import pog1 from './emotes/PepePls.gif'
import InlineChatEmote from './InlineChatEmote'
import {v4 as uuidV4} from 'uuid'

const ChatBoxMessage = React.memo(({messageID, messageJSON}) => {
    const [messageToDisplay, setMessageToDisplay] = useState([])
    
    console.log('start')
    useEffect(() => {
        document.getElementById('chat-box-message-' + messageID).scrollIntoView()
        console.log(2)
        let messageString = ''
        let finalizedMessageArray = []
        for(let i = 0; i < messageJSON.fullMessageProcessedArray.length; i++){
            // console.log(messageJSON.fullMessageProcessedArray[i])
            if(messageJSON.fullMessageProcessedArray[i][0] != '/'){
                messageString += messageJSON.fullMessageProcessedArray[i] + ' '
            }
            else{
                
                if(messageJSON.fullMessageProcessedArray[i][1] == 'e' && messageJSON.fullMessageProcessedArray[i][2] == '/'){
                    const emoteID = (messageJSON.fullMessageProcessedArray[i]).substring(3)
                    
                    // console.log(emoteID)

                    finalizedMessageArray.push(messageString, <InlineChatEmote  key={uuidV4()} emoteID={emoteID} />)
                    messageString = ' '
                    
                }
            }
        }

        // let temporaryMessageArray = messageToDisplay
        // console.log(temporaryMessageArray)
        // if(messageString != ' '){
        //     temporaryMessageArray.push(messageString)
        // }
        // console.log(temporaryMessageArray)
        // console.log(['ayo wtf is going on'])

        // let test = ['ayo wtf is on ', <InlineChatEmote emoteID={'58ae8407ff7b7276f8e594f2'} />]
        if(messageString != ' '){
            finalizedMessageArray.push(messageString)
        }
        console.log(finalizedMessageArray)
                
        setMessageToDisplay(finalizedMessageArray)

        // console.log(messageToDisplay)

        // let testy = ['hehe ', 'hoohoo ', <InlineChatEmote emoteID={'58ae8407ff7b7276f8e594f2'} />]
        // setMessage(testy)
    }, [])

    return (
        <div id={'chat-box-message-' + messageID} className='chat-box-message'>
            <div id={'chat-box-message-username-' + messageID} className='chat-box-message-username'>
                {messageJSON.chatterName}
            </div>
            <span style={{verticalAlign: 'middle'}}>: </span>
            <div id={'chat-box-message-content' + messageID} className='chat-box-message-content'>
                {messageToDisplay}
            </div>
        </div>
    );
})

export default ChatBoxMessage
