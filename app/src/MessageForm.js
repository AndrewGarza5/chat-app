import React, { useEffect, useState, useRef } from 'react'
import './styles/chat-box.css'
import './styles/message-form.css'
import {v4 as uuidV4} from 'uuid'
import $ from 'jquery'
import ChatBoxMessage from './ChatBoxMessage'
import InlineChatEmote from './InlineChatEmote'
import MessageFormInlineText from './MessageFormInlineText'
import MessageFormInlineEmote from './MessageFormInlinEmote'
import { toBeEmptyDOMElement } from '@testing-library/jest-dom/dist/matchers'

export default function ChatBox({ sendMessage, emoteList }) {

    const [messageFormInnerObjects, setMessageFormInnerObjects] = useState()
    const [messageFormRootNode, setMessageFormRootNode] = useState()
    const [pleaseWork, setPleaseWork] = useState(<MessageFormInlineText text={'haha o'} />)

    String.prototype.replaceJSX = (start, find, replace) => {
        // console.log(start.split(find).flatMap((item) => [item, replace]))
        return start.split(find).flatMap((item) => [item, replace]);
    }

    useEffect(() => {
        document.getElementById('message-form-input').addEventListener('focus', (e) => {
            console.log(123)
        })

        setMessageFormRootNode(document.getElementById('message-form-input'))
        // document.getElementById('message-form-input').addEventListener('paste', (e) => {
        //     e.preventDefault();
        //     const text = e.clipboardData.getData('text/plain')
        //     console.log(text)
        //     document.execCommand("insertHTML", false, text);
        // })

        
        // $('#message-form-input-edit').on('input', function() {
        //     var fromString = 'testy'
        //     var newString = <span><MessageFormInlineEmote emoteID={'55898e122612142e6aaa935b'} /></span>

        //     var value = $(this).val();
        //     let obj = []

        //     if (value.indexOf(fromString) !== -1) {
    
        //         // Using RegExp Object for variable string
        //         var rgx = new RegExp(fromString, 'g');
                
        //         // New value of textarea#edit replaced 'from' with 'to'
        //         // obj.push('TST:')
        //         // obj.push(<MessageFormInlineEmote emoteID={'55898e122612142e6aaa935b'} />)
        //         // obj.push(':TST')


        //         value = value.replaceJSX(value, rgx, newString)
        //         console.log(value)
        //     }

        //     $('#message-form-input-view').html(value);

        //     $(this).val(value);
        // })

        // $('#message-form-input-view').on('keydown', function() {
        //     $('#message-form-input-edit')[0].focus();
        // })
    }, [])


    const refTest = useRef(<MessageFormInlineEmote emoteID={'55898e122612142e6aaa935b'} />)
    function handleMessageChange(e){


        for(const node of messageFormRootNode.childNodes){
            console.log(node)
            if(node.nodeType == 3){
                const newNodeForRawText = document.createElement('span')
                newNodeForRawText.className = 'message-form-inline-text'
                newNodeForRawText.innerText = node.nodeValue 

                messageFormRootNode.insertBefore(newNodeForRawText, node)
                messageFormRootNode.removeChild(node)
            }
            else if(node.nodeType == 1){
                const slicedNodeInnerText = (node.innerText).split(/(\s+)/)

                for(let i = 0; i < slicedNodeInnerText.length; i++){
                    if(emoteList.current.data[slicedNodeInnerText[i]] != undefined){
                        let emoteID = emoteList.current.data[slicedNodeInnerText[i]]
                        console.log(emoteID)
                        
                        const messageBeforeEmote = slicedNodeInnerText.slice(0, i)
                        const nodeMessageBeforeEmote = document.createElement('span')
                        nodeMessageBeforeEmote.className = 'message-form-inline-text'
                        nodeMessageBeforeEmote.innerText = messageBeforeEmote.join('')


                        const messageAfterEmote = slicedNodeInnerText.slice(i + 1)
                        const nodeMessageAfterEmote = document.createElement('span')
                        nodeMessageAfterEmote.className = 'message-form-inline-text'
                        nodeMessageAfterEmote.innerText = messageAfterEmote.join('')

                        const nodeEmoteSpan = document.createElement('span')
                        nodeEmoteSpan.className = 'message-form-inline-emote'
                        const nodeEmoteImg = document.createElement('img')
                        nodeEmoteImg.className = 'message-form-inline-emote-img'
                        nodeEmoteImg.src = 'https://cdn.betterttv.net/emote/' + emoteID + '/2x'
                        nodeEmoteSpan.appendChild(nodeEmoteImg)

                        // if(messageBeforeEmote != ''){
                        //     rootNode.insertBefore(nodeMessageBeforeEmote, node)
                        // }
                        // else{
                        //     nodeMessageBeforeEmote.remove()
                        // }
                        messageFormRootNode.insertBefore(nodeMessageBeforeEmote, node)

                        messageFormRootNode.insertBefore(nodeEmoteSpan, node)

                        if(messageAfterEmote == ''){
                            nodeMessageAfterEmote.innerText = ' '
                            messageFormRootNode.insertBefore(nodeMessageAfterEmote, node)
                        }
                        else{
                            messageFormRootNode.insertBefore(nodeMessageAfterEmote, node)
                        }
                        messageFormRootNode.removeChild(node)



                    }
                }
            }


            
        }


        return

        const slicedMessage = e.target.innerText.split(/(\s+)/)
        e.target.innerText = ''
        setMessageFormInnerObjects(<MessageFormInlineText key={uuidV4()} text={'woow hahah EZ'} />)
        console.log(messageFormInnerObjects)
        e.target.innerHTML = messageFormInnerObjects
        return
        // e.target.innerText = slicedMessage.join('')
        console.log(slicedMessage)

        // e.target.innerText = slicedMessage
        // *** Need to figure out a better/more efficient way to do this in the server. Something like storing emote_list  in cache or memory. 
        // Currently, it just reads straight from the database everytime someone requests emote_list. 
        // In this state that means it will read from the database everytime someone visits the site which is pretty wasteful.
        
        
        let fullMessageProcessedArrayMessageForm = []
        let spanMessageObjectMessageForm = []
        for(let i = 0; i < slicedMessage.length; i++){
            if(emoteList.current.data[slicedMessage[i]] == undefined){
                spanMessageObjectMessageForm.push(slicedMessage[i])
            }
            else if(emoteList.current.data[slicedMessage[i]] != undefined){
                let emoteID = emoteList.current.data[slicedMessage[i]]
                console.log(emoteID)

                fullMessageProcessedArrayMessageForm.push(<MessageFormInlineText text={spanMessageObjectMessageForm.join('')} />)
                fullMessageProcessedArrayMessageForm.push(<MessageFormInlineEmote emoteID={emoteID} />)

                spanMessageObjectMessageForm = []
                // slicedMessage[i] = '/e/' + emoteID
            }
        }

        if(fullMessageProcessedArrayMessageForm.length == 0){
            console.log(spanMessageObjectMessageForm)
            fullMessageProcessedArrayMessageForm.push(<MessageFormInlineText text={spanMessageObjectMessageForm.join('')} />)
        }

        console.log(fullMessageProcessedArrayMessageForm)

        // e.target.innerText = fullMessageProcessedArrayMessageForm
        setMessageFormInnerObjects(fullMessageProcessedArrayMessageForm)
        
        // setfullMessageProcessedArray(slicedMessage)

    }

    function checkForSubmit(e){
        const rootNode = document.getElementById('message-form-input') 

        for(const node of rootNode.childElementCount){
            console.log(node)
        }

        if(e.shiftKey == false && e.key == 'Enter'){
            e.preventDefault()
            handleChatSubmit(e.target.innerText)
        }
    }

    function handleChatSubmit(message){

        const fullMessageProcessedArray = (document.getElementById('message-form-input')).innerText.split(/\s+/)
        console.log(fullMessageProcessedArray)
        // *** Need to figure out a better/more efficient way to do this in the server. Something like storing emote_list  in cache or memory. 
        // Currently, it just reads straight from the database everytime someone requests emote_list. 
        // In this state that means it will read from the database everytime someone visits the site which is pretty wasteful.
        for(let i = 0; i < fullMessageProcessedArray.length; i++){
            if(emoteList.current.data[fullMessageProcessedArray[i]] != undefined){
                let emoteID = emoteList.current.data[fullMessageProcessedArray[i]]
                fullMessageProcessedArray[i] = '/e/' + emoteID
            }
        }
        if(fullMessageProcessedArray.length > 0){
            let fullMessageRawText = document.getElementById('message-form-input').innerText
            sendMessage(fullMessageProcessedArray, fullMessageRawText)
            document.getElementById('message-form-input').innerText = ''
        }
        
    }
    
    // TESTING ON DIFFERENT BROWSERS:
    // New line with shift + enter
    // using enter as submit
    // copy paste into input
    return (
        <form className='message-form-container' onSubmit={handleChatSubmit}>
            {/* <fieldset className='message-form-input-fieldset'> */}
                <div 
                    id='message-form-input' 
                    className='message-form-input'
                    placeholder='Send a message...'
                    onInput={handleMessageChange}
                    // onKeyDown={checkForSubmit}
                    contentEditable={true}
                    suppressContentEditableWarning={true} 
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    autoComplete="off"
                    // *** Remember to abide by ContentEditable concepts. The DOM does not keep track of anything inside this div, so I 
                    // have to make sure I manage it well. No memory leaks!
                >
                    {/* <div id='hmm' className='hmm'>

                    </div> */}
                    
                </div>

                {/* <textarea 
                    id='message-form-input-edit' 
                    className='message-form-input-edit'
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                >
                </textarea> */}
            {/* </fieldset> */}
            
            <div id='message-form-submit-button' className='message-form-submit-button' onClick={handleChatSubmit}>
                Chat
            </div>
        </form>
    );
}