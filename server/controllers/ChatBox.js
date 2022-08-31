

const pool = require('../db/connect')
const crypto = require('crypto')

const CreateChatBox = async (req, res) => {
    try{
        const chatBoxId = crypto.randomUUID()
        const chatBoxName = req.body['chatBoxName']
        console.log(chatBoxId, chatBoxName)
        if(chatBoxName == '' || chatBoxName == null || chatBoxName == undefined){
            res.status(400).json({msg:'Chat Box name must have more than 0 characters'})
        }

        let query = await pool.query(
            "INSERT INTO chatbox VALUES ($1, $2);",
            [chatBoxId, chatBoxName]
        )
        console.log(query)
        res.status(200).json({msg: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

const DeleteChatBox = async (req, res) => {
    try{

        console.log(99)
        res.status(200).json({msg: 'success'})

    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

module.exports = {
    CreateChatBox,
    DeleteChatBox
}

