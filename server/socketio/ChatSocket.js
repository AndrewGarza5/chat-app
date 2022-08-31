module.exports = (io, socket) => {

    const sendMessageToChat = ( { messageID, messageJSON, chatRoomName } ) => {
      
      socket.to(chatRoomName).emit('recieveMessageFromChatter', { messageID, messageJSON } )
    }
  

  
    socket.on("sendMessageToChat", sendMessageToChat)
  }