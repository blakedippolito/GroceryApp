const express = require('express')
const router = express.Router()
const listController = require('../controllers/list')

router.get('/', listController.getIndex)

module.exports = router