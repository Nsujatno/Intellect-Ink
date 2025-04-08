const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch");

// Define the quiz schema
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

// Create or get the existing Quiz model
const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

// GET /api/quiz/fetch-quiz - Fetch one quiz from external API and save
router.get("/fetch-quiz", async (req, res) => {
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
      return res.status(400).json({ error: "Invalid quiz response" });
    }

    const exists = await Quiz.findOne({ question: quiz.question });
    if (exists) {
      return res.json({ message: "Quiz already exists", quiz: exists });
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
    res.json({ message: "Quiz saved", quiz: newQuiz });
  } catch (error) {
    console.error("❌ Error in /fetch-quiz:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/quiz/get-quizzes - Return all saved quizzes
router.get("/get-quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("❌ Error in /get-quizzes:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Correct export (important!)
module.exports = router;
