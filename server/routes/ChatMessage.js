const express = require('express')
const router = express.Router()

const {
    PostChatMessage,
    DeleteChatMessage
} = require('../controllers/ChatMessage.js')


router.route('/').post(PostChatMessage)
router.route('/:chatMessageId').delete(DeleteChatMessage)

module.exports = router