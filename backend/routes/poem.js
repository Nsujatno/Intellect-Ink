const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch");

// Quiz schema
const quizSchema = new mongoose.Schema({
  question: { type: String, unique: true },
  description: String,
  answers: Object,
  correct_answer: String,
  explanation: String,
  tags: Array,
  category: String,
  difficulty: String,
  multiple_correct_answers: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);

<<<<<<< HEAD
// Endpoint to fetch and save a random quiz
router.get("/fetch-quiz", async (req, res) => {
=======
router.post("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  if(!keyword) return res.json([])
  const regex = new RegExp(keyword, "i");
  const results = await Poem.find({
    $or: [
      { title: regex },
      { lines: regex }
    ]
  });
  // console.log(results);
  res.json(results)
})

const AUTHOR_NAME = "William Shakespeare";
const API_URL = `https://poetrydb.org/author/${encodeURIComponent(AUTHOR_NAME)}`;

router.get("/data", async (req, res) => {
>>>>>>> 2e40207ab5e592bd1cf63c9d59f27478c2f7dd49
  try {
    const API_KEY = process.env.QUIZ_API_KEY;
    const API_URL = "https://quizapi.io/api/v1/questions?limit=1";

    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const [quiz] = await response.json();

    if (!quiz || !quiz.question) {
      throw new Error("No quiz received or missing 'question' field");
    }

    const existingQuiz = await Quiz.findOne({ question: quiz.question });
    if (existingQuiz) {
      return res.json({ message: "Quiz already exists", quiz: existingQuiz });
    }

    const newQuiz = new Quiz({
      question: quiz.question,
      description: quiz.description,
      answers: quiz.answers,
      correct_answer: quiz.correct_answer,
      explanation: quiz.explanation,
      tags: quiz.tags,
      category: quiz.category,
      difficulty: quiz.difficulty,
      multiple_correct_answers: quiz.multiple_correct_answers,
    });

    await newQuiz.save();
    res.json({ message: "Quiz saved successfully", quiz: newQuiz });
  } catch (error) {
    console.error("❌ Error fetching quiz:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all saved quizzes
router.get("/get-quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("❌ Error retrieving quizzes:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
