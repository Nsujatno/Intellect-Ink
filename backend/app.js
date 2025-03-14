const express = require('express')
require('dotenv').config();
require('./db')
const cors = require('cors');

const userRouter = require('./routes/user')

const app = express()

const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json()) // This is used to take the data given and store it in the req.body which is why we can reference it later on
app.use('/api/user', userRouter);


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello Express and Hello world</h1>')
})