const express = require('express')
const router = express.Router()
const listController = require('../controllers/list')

router.get('/', listController.getItems)

router.post('/addItem', listController.addItem)

router.delete('/deleteItem', listController.deleteItem)

router.put('/markComplete', listController.markComplete)

router.put('/markIncomplete', listController.markIncomplete)

module.exports = router