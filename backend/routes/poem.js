const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

// Define Mongoose schema for storing poems
const poemSchema = new mongoose.Schema({
  title: { type: String, unique: true }, // Prevent duplicate poems by title
  author: String,
  lines: [String],
});

const Poem = mongoose.model("Poem", poemSchema);

router.get("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  const results = await Poem.find({ lines: new RegExp(keyword, "i") });
  // console.log(results);
  res.json(results)
})

const AUTHOR_NAME = "William Shakespeare";
const API_URL = `https://poetrydb.org/author/${encodeURIComponent(AUTHOR_NAME)}`;

router.get("/data", async (req, res) => {
  try {
    console.log("📖 Fetching poems from PoetryDB API:", API_URL);

    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of poems, but got something else.");
    }

    let savedCount = 0;

    for (let poem of data) {
      const existingPoem = await Poem.findOne({ title: poem.title });

      if (!existingPoem) {
        const newPoem = new Poem({
          title: poem.title,
          author: poem.author,
          lines: poem.lines,
        });

        await newPoem.save();
        savedCount++;
      }
    }

    res.json({ message: "Poems processed", newPoemsAdded: savedCount });
  } catch (error) {
    console.error("❌ Error fetching API data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve stored poems
router.get("/get-poems", async (req, res) => {
  try {
    const poems = await Poem.find();
    res.json(poems);
  } catch (error) {
    console.error("❌ Error retrieving poems:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;