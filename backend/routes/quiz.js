const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch");

// Define the quiz schema
const quizSchema = new mongoose.Schema({
  question: { type: String, unique: true },
  description: { type: String, default: "No description provided" },
  answers: Object,
  multiple_correct_answers: Boolean,
  correct_answer: String,
  explanation: { type: String, default: "No explanation available" },
  tags: Array,
  category: String,
  difficulty: String,
  topic: { type: String, default: "Computer Science" }, // ✅ Add topic field
});

// 🔁 Temporarily change model name to force schema recompilation
const Quiz = mongoose.models?.Quizz || mongoose.model("Quizz", quizSchema);

// GET /api/quiz/fetch-quiz - Fetch one quiz from external API and save
router.get("/fetch-quiz", async (req, res) => {
  try {
    const API_KEY = process.env.QUIZ_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: "API key is missing in environment variables." });
    }

    const API_URL = "https://quizapi.io/api/v1/questions?limit=1&correct_answers=true";

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
      return res.status(400).json({ error: "Invalid quiz response, missing question." });
    }

    let correctAnswer = null;
    Object.keys(quiz.correct_answers).forEach((key) => {
      if (quiz.correct_answers[key] === "true") {
        correctAnswer = key;
      }
    });

    const exists = await Quiz.findOne({ question: quiz.question });
    if (exists) {
      return res.json({ message: "Quiz already exists", quiz: exists });
    }

    const newQuiz = new Quiz({
      question: quiz.question,
      description: quiz.description || "No description provided",
      answers: quiz.answers,
      multiple_correct_answers: quiz.multiple_correct_answers === "true",
      correct_answer: correctAnswer,
      explanation: quiz.explanation || "No explanation available",
      tags: quiz.tags,
      category: quiz.category,
      difficulty: quiz.difficulty,
      topic: "Computer Science", // ✅ Set hardcoded topic
    });

    await newQuiz.save()
      .then(() => {
        console.log("Quiz saved successfully!");
        res.json({ message: "Quiz saved", quiz: newQuiz });
      })
      .catch((error) => {
        console.error("Error saving quiz:", error);
        res.status(500).json({ error: "Error saving quiz: " + error.message });
      });

  } catch (error) {
    console.error("❌ Error in /fetch-quiz:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
