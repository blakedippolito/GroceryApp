const express = require('express')
const router = express.Router()
const listController = require('../controllers/list')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, listController.getItems)

router.post('/addItem', listController.addItem)

router.delete('/deleteItem', listController.deleteItem)

router.put('/markComplete', listController.markComplete)

router.put('/markIncomplete', listController.markIncomplete)

module.exports = router