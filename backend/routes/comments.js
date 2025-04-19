const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const axios = require('axios');

const commentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    question: {
        type: String,
    },
    body: {
        type: String,
    },
    mediaId: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

const Comments = mongoose.model('Comments', commentsSchema)

router.post("/post-comment", async (req, res) => {
    // console.log("post-comment req recieved");
    const {email, question, body, mediaId, createdAt} = req.body
    const newComment = new Comments({
        email,
        question,
        body,
        mediaId,
        createdAt,
    })
    await newComment.save()
    res.send(newComment)
})

router.post("/delete-comment", async (req, res) => {
    const {_id} = req.body
    const user = await Comments.findOne({_id})
        if(user){
            await Comments.findByIdAndDelete(_id)
            console.log("Comment deleted");
            res.json("Comment deleted")
        }
        else{
            console.log("The comment id couldn't be found")
            res.json("The comment id couldn't be found")
        }
})

router.post("/edit-comment", async (req, res) => {
    const {_id, question, body} = req.body
    await Comments.findByIdAndUpdate(_id, {question, body});
    console.log("Comment updated with question: " + question + " and body: " + body);
    res.json("Comment updated with question: " + question + " and body: " + body);
})

router.post("/get-comments", async (req, res) => {
    const {mediaId} = req.body
    const comments = await Comments.find({mediaId})
    res.json(comments)
})
module.exports = router;