const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

// Define the schema for OpenTDBQuiz
const quiz2Schema = new mongoose.Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
  category: { type: String },
  type: { type: String },
  difficulty: { type: String },
});

// Define the model using the collection name 'quizzs'
const OpenTDBQuiz = mongoose.model('OpenTDBQuiz', quiz2Schema, 'quizzs');

const router = express.Router();

// Route to fetch and save questions from OpenTDB
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=13&category=23&type=multiple');
    
    const questions = response.data.results;

    if (!questions || questions.length === 0) {
      return res.status(500).json({ error: 'No questions received from API.' });
    }

    const savedQuestions = [];

    for (const q of questions) {
      const modifiedCategory = q.category && q.category.includes("Science") ? "Science" : q.category;

      const newQuiz = new OpenTDBQuiz({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
        category: modifiedCategory, // Saving the modified category
        difficulty: q.difficulty,
        type: q.type
      });

      await newQuiz.save()
        .then(saved => {
          savedQuestions.push(saved);
        })
        .catch(err => {
          console.error("Error saving quiz: ", err);
        });
    }

    res.status(savedQuestions.length > 0 ? 200 : 500).json(savedQuestions);

  } catch (error) {
    console.error("Error fetching or saving questions: ", error);
    res.status(500).json({ error: 'Failed to fetch and save OpenTDB questions.' });
  }
});

module.exports = router;

/*
const express = require('express');
const mongoose = require('mongoose');

const quiz2Schema = new mongoose.Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
  category: { type: String },
  type: { type: String },
  difficulty: { type: String },
});

const OpenTDBQuiz = mongoose.model('OpenTDBQuiz', quiz2Schema, 'quizzs');

const router = express.Router();

// Store used _ids in memory (can also use Redis/session/db if needed)
const usedIds = [];

router.get('/fetch', async (req, res) => {
  try {
    const allQuestions = await OpenTDBQuiz.find({});
    
    // Filter out used questions
    const unusedQuestions = allQuestions.filter(q => !usedIds.includes(q._id.toString()));

    if (unusedQuestions.length === 0) {
      return res.status(404).json({ error: 'All questions have been used.' });
    }

    // Pick a random question from the unused ones
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const randomQuestion = unusedQuestions[randomIndex];

    // Mark the question as used
    usedIds.push(randomQuestion._id.toString());

    res.status(200).json(randomQuestion);

  } catch (error) {
    console.error("Error fetching question from DB:", error);
    res.status(500).json({ error: 'Failed to fetch question from database.' });
  }
});

module.exports = router;
*/