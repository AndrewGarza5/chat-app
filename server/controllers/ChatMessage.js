const pool = require('../db/connect')
const crypto = require('crypto')

const PostChatMessage = async (req, res) => {
    try{
        const chatId = crypto.randomUUID()
        const chat = req.body['chat']

        let query = await pool.query(
            "INSERT INTO chats ('hmm', 'huu');",
            [chatId, chat]
        )
        console.log(query)
        res.status(200).json({msg: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

const DeleteChatMessage = async (req, res) => {
    try{

        console.log(99)
        res.status(200).json({msg: 'success'})

    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

module.exports = {
    PostChatMessage,
    DeleteChatMessage
}