const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const CORE_API_KEY = process.env.CORE_API_KEY;
if (!CORE_API_KEY) {
  console.error("❌ Missing CORE API key! Check your .env file.");
  process.exit(1);
}

// Define a Mongoose schema for storing research papers
const researchPaperSchema = new mongoose.Schema({
  title: String,
  authors: [String], // Expecting an array of strings
  publisher: String,
  year: Number,
  url: String,
  abstract: String,
  topics: [String],
});

const ResearchPaper = mongoose.model("ResearchPaper", researchPaperSchema);

// Fetch research papers from CORE API
router.get("/data", async (req, res) => {
  try {
    console.log("📄 Fetching research papers...");

    const response = await fetch(`https://api.core.ac.uk/v3/search/works?query=machine+learning`, {
      headers: { Authorization: `Bearer ${CORE_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    let savedCount = 0;

    for (let paper of data.results || []) {
      const exists = await ResearchPaper.findOne({ title: paper.title });
      if (exists) continue; // Skip duplicates

      // Extract authors' names into an array of strings
      const authors = paper.authors ? paper.authors.map((author) => author.name) : [];

      const newPaper = new ResearchPaper({
        title: paper.title,
        authors: authors,
        publisher: paper.publisher,
        year: paper.year,
        url: paper.links?.[0]?.url,
        abstract: paper.abstract,
        topics: paper.topics || [],
      });

      await newPaper.save();
      savedCount++;
    }

    res.json({ message: "Papers saved to database", count: savedCount });
  } catch (error) {
    console.error("❌ Error fetching papers:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get stored research papers
router.get("/get-papers", async (req, res) => {
  try {
    const papers = await ResearchPaper.find();
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;