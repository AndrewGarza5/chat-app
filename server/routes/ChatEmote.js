const express = require('express')
const router = express.Router()

const {
    GetEmote,
    GetEmoteList
} = require('../controllers/ChatEmote.js')


router.route('/image/:emoteName').get(GetEmote)
router.route('/emote-list').get(GetEmoteList)

module.exports = router