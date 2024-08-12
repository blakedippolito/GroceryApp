const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const listRoutes = require('./routes/list')

require('dotenv').config({path: './config/.env'})
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/list', listRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})