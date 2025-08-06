const router = require('express').Router()

const { getArticle } = require('../controllers/guardian')

router.get('/guardian', getArticle);


module.exports = router