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
    const response = await axios.get('https://opentdb.com/api.php?amount=5&category=17&type=multiple');
    
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
