const express = require('express')
const router = express.Router()
const iconsController = require('../controllers/icons')

router.get('/search', iconsController.getIcons)


module.exports = router