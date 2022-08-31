

const pool = require('../db/connect')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { Connection } = require('pg')
const { connect } = require('http2')

const GetEmote = async (req, res) => {
    try{
        let emotePathGif = path.join(__dirname, '..', 'chat_emotes', req.params['emoteName'] + '.gif')
        let emotePathPng = path.join(__dirname, '..', 'chat_emotes', req.params['emoteName'] + '.png')

        if(fs.existsSync(emotePathPng)){
            res.status(200).download(emotePathPng)
            return
        }

        if(fs.existsSync(emotePathGif)){
            res.status(200).download(emotePathGif)
            return
        }

        res.status(404).json({msg: 'The emote you are looking for does not exist'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

// *** Need to figure out a better/more efficient way to do this. Something like storing it in cache or memory. 
// Currently, it just reads straight from the database. In this state that means it will read from the database everytime
// someone visits the site. Which is pretty wasteful
const GetEmoteList = async (req, res) => {
    try{
        
        // get all key value pairs from database
        // name : id
        // use non sql injection query !!

        let query = await pool.query('SELECT * FROM emote_list;')

        let JSONEmoteList = {}
        for(let i = 0; i < query.rowCount; i++){
            JSONEmoteList[(query.rows[i]['emote_name'])] = (query.rows[i]['emote_id'])
        }

        res.status(200).json(JSONEmoteList)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
}

module.exports = {
    GetEmote,
    GetEmoteList
}

