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
<<<<<<< HEAD
const quiz2Router = require('./routes/quiz2'); // add this


=======
const commentRouter = require('./routes/comments')
const replyRouter = require('./routes/replys')
>>>>>>> 5bdbc1bafa61b7e27fe36a92b3eb724be35fc7fe

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
<<<<<<< HEAD
app.use('/api/quiz2', quiz2Router);


=======
app.use('/api/comments', commentRouter);
app.use('/api/replys', replyRouter);
>>>>>>> 5bdbc1bafa61b7e27fe36a92b3eb724be35fc7fe

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello Express and Hello world</h1>')
})