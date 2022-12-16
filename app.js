const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
const errorHandlerMiddleware = require('./middlewares/error-handler')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/v1/tasks', tasks)
app.use(errorHandlerMiddleware)

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await connectDB(process.env.MONGO_URI)
    console.log('server is listening on port 3000...')
})