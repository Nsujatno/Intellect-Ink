const router = require('express').Router()

const { createUser, signin, forgotPassword, verifyEmail, resetPassword, getProfile, updateProfile, updateFavorites } = require('../controllers/user');
const { isResetTokenValid, authMiddleware } = require('../middlewares/user');
const { validateUser, validate } = require('../middlewares/validator');


router.post('/create', validateUser, validate, createUser);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);

router.get('/get-profile', authMiddleware, getProfile)
router.put('/update-profile', authMiddleware, updateProfile)
router.put('/update-favorites', authMiddleware, updateFavorites)

module.exports = router

