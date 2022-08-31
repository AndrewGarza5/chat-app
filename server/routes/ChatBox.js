const express = require('express')
const router = express.Router()

const {
    CreateChatBox,
    DeleteChatBox
} = require('../controllers/ChatBox.js')


router.route('/').post(CreateChatBox)
router.route('/:chatBoxId').delete(DeleteChatBox)

module.exports = router