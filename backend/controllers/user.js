const User = require('../model/user')
const VerificationToken = require('../model/verificationToken')
const ResetToken = require('../model/resetToken')
const { sendError, createRandomBytes } = require('../utils/helper')

const crypto = require('crypto')

const jwt = require('jsonwebtoken')
const { generateOTP, mailTransport } = require('../utils/mail')
const { isValidObjectId } = require('mongoose')
const verificationToken = require('../model/verificationToken')

exports.updateFavorites = async (req, res) => {
    try{
        const { favorites } = req.body;
        const { itemId, itemType } = favorites;

        const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                'favorites.itemId': { $each: itemId },
            },
            $push: {
                'favorites.itemType': { $each: itemType },
              }
        },
        { new: true, runValidators: true }
        );

        res.json({
            favorites: updatedUser.favorites
          });
    } catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getProfile = async (req, res) => {
    try{
        res.json({
            name: req.user.name,
            email: req.user.email,
            media: req.user.media || [],
            dailyReadingTime: req.user.dailyReadingTime,
            notification: req.user.notification,
            favorites: req.user.favorites,
          });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


exports.updateProfile = async (req, res) => {
    try{
        const {name, media, dailyReadingTime, notification} = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name,
                media,
                dailyReadingTime,
                notification,
            },
            { new: true, runValidators: true}
        )

        res.json({
            name: updatedUser.name,
            media: updatedUser.media,
            dailyReadingTime: updatedUser.dailyReadingTime,
            notification: updatedUser.notification,
          });
    }
    catch(error){
        console.log(error)
    }
}

exports.createUser = async (req, res) =>{
    const {name='newUser', email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        return sendError(res, 'This email already exitst!')
    }
    const newUser = new User({
        name,
        email,
        password 
    })

    // const OTP = generateOTP()
    // const verificationToken = new VerificationToken({
    //     owner: newUser._id,
    //     token: OTP
    // })

    // await verificationToken.save()
    await newUser.save()

    // mailTransport().sendMail({
    //     from: 'emailverification@email.com',
    //     to: newUser.email,
    //     subject: "Verify your email account",
    //     html: `<h1>Your verification code is: ${OTP}</h1>`
    // })

    res.send(newUser)
}

exports.signin = async (req, res) => {
    const {email, password} = req.body
    if(!email.trim() || !password.trim()) return sendError(res, 'Email/password is missing!')

    const user = await User.findOne({email})
    console.log(user);
    if(!user) return sendError(res, 'User not found!')
    
    const isMatched = await user.comparePassword(password)
    if(!isMatched) return sendError(res, 'Email/password does not match!')

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.json({success: true, message: "sign in successful", user: {name: user.name, email: user.email, id: user._id, token}})
}

exports.verifyEmail = async (req, res) => {
    // const {userId, otp} = req.body
    // if(!userId || !otp.trim()) return sendError(res, "Invalid request, missing parameters!");

    // if(!isValidObjectId(userId)) return sendError(res, "Invalid user id!");

    // const user = await User.findById(userId)
    // if(!user) return sendError(res, "User not found!");

    // if(user.verified) return sendError(res, "This account is already verified!");

    // const token = await VerificationToken.findOne({owner: user._id})
    // if(!token) return sendError(res, "Sorry, user not found");

    // const isMatched = await token.compareToken(otp)
    // if(!isMatched) return sendError(res, "Please provide a valid token!");

    // user.verified = true;

    // await VerificationToken.findByIdAndDelete(token._id);
    // await user.save();

    // mailTransport().sendMail({
    //     from: 'emailverification@email.com',
    //     to: user.email,
    //     subject: "Verify your email account",
    //     html: `<h1>Email verified successfully! Thank you for connecting with us!</h1>`
    // })
    // res.json({success: true, message: "your email is verified!", user: {name: user.name,
    //     email: user.email, id: user._id
    // }})

}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    if(!email) return sendError(res, 'Please provide a valid email!')

    const user = await User.findOne({email})
    if(!user) return sendError(res, 'User not found!')

    const token = await ResetToken.findOne({owner: user._id})
    if(token) return sendError(res, 'Only after one hour you can request for another tooken!!')

    const randomBytes = await createRandomBytes()
    const resetToken = new ResetToken({owner: user._id, token: randomBytes})
    await resetToken.save()

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: "Password Reset",
        html: `<a href="${`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`}">Password reset link</a>`
    })

    res.json({success: true, message: 'Password reset link is sent to your email.'})
}

exports.resetPassword = async (req, res) => {
    const {password} = req.body

    const user = await User.findById(req.user._id);
    if(!user) return sendError(res, 'user not found!');

    const isSamePassword = await user.comparePassword(password)
    if(isSamePassword) return sendError(res, 'New password must be different!');

    if(password.trim().length < 8 || password.trim().length > 20)
        return sendError(res, 'Password must be 8 to 20 characters long!');

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({owner: user._id})

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: "Password Reset Successfully",
        html: `<h1>Password was reset successfully! Now you can login with your new password!</h1>`
    })

    res.json({success: true, message: "Password Reset Successfully"})
}