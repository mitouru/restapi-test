require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const documentsRouter = require('./routes/documents')
app.use('/documents', documentsRouter)


app.get('/', (req, res) => {
    res.send("Hello Network!")
});

app.listen(3000, '10.12.165.2', () => console.log('Server started'))