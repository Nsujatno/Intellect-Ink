const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const axios = require('axios');

const replySchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    email: {
        type: String
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Reply = mongoose.model('Reply', replySchema);

router.post("/get-replys", async (req, res) => {
    const {commentId} = req.body
    const comments = await Reply.find({commentId})
    res.json(comments)
})

router.post("/post-reply", async (req, res) => {
    const { commentId, email, text } = req.body;
    const newReply = new Reply({
        commentId,
        email,
        text,
    });
    await newReply.save();
    res.send(newReply);
});

router.post("/edit-reply", async (req, res) => {
    const { _id, text } = req.body;
    try {
        const updatedReply = await Reply.findByIdAndUpdate(_id, { text }, { new: true });
        if (updatedReply) {
            console.log("Reply updated with text: " + text);
            res.json("Reply updated with text: " + text);
        } else {
            console.log("The reply id couldn't be found");
            res.json("The reply id couldn't be found");
        }
    } catch (error) {
        console.error("Error updating reply:", error);
        res.status(500).json("Error updating reply");
    }
});

router.post("/delete-reply", async (req, res) => {
    const { _id } = req.body;
    try {
        const reply = await Reply.findOne({ _id });
        if (reply) {
            await Reply.findByIdAndDelete(_id);
            console.log("Reply deleted");
            res.json("Reply deleted");
        } else {
            console.log("The reply id couldn't be found");
            res.json("The reply id couldn't be found");
        }
    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json("Error deleting reply");
    }
});

module.exports = router;