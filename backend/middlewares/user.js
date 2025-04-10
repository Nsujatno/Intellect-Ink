const User = require('../model/user')
const ResetToken = require('../model/resetToken')
const jwt = require('jsonwebtoken');

const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");

exports.isResetTokenValid = async (req, res, next) => {
    const {token, id} = req.query
    if(!token || !id) return sendError(res, 'Invalid request!');

    if(!isValidObjectId(id)) return sendError(res, 'Invalid user!');

    const user = await User.findById(id)

    if(!user) return sendError(res, 'user not found!');

    const resetToken = await ResetToken.findOne({owner: user._id})
    if(!resetToken) return sendError(res, 'Reset token not found!');

    const isValid = await resetToken.compareToken(token)
    if(!isValid) return sendError(res, 'Reset token is invalid!');

    req.user = user
    next()
}

exports.authMiddleware = async (req, res, next) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.userId });
        
        console.log("Decoded JWT:", decoded);
        console.log("Token:", token);
        if (!user) {
        return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    }
    catch (error){
        res.status(401).json({ error: 'Authentication failed' });
    }
}