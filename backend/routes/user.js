const router = require('express').Router()

const { createUser, signin, forgotPassword, verifyEmail, resetPassword } = require('../controllers/user');
const { isResetTokenValid } = require('../middlewares/user');
const { validateUser, validate } = require('../middlewares/validator');


router.post('/create', validateUser, validate, createUser);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);



module.exports = router

