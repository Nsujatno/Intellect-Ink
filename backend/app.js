const express = require('express')
const axios = require('axios');
require('dotenv').config();
require('./db')
const cors = require('cors');

const userRouter = require('./routes/user')
const guardianRouter = require('./routes/guardian')
const articleRouter = require('./routes/article')
const bookRouter = require('./routes/books')
const newsRouter = require('./routes/news')
const paperRouter = require('./routes/paper')
const poemRouter = require('./routes/poem')
const quizRouter = require('./routes/quiz');
const quiz2Router = require('./routes/quiz2'); // add this



const app = express()

const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json())
app.use('/api/user', userRouter);
app.use('/api', guardianRouter);
app.use('/api/article', articleRouter);
app.use('/api/book', bookRouter);
app.use('/api/news', newsRouter);
app.use('/api/paper', paperRouter);
app.use('/api/poem', poemRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/quiz2', quiz2Router);



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello Express and Hello world</h1>')
})