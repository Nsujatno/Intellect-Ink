const router = require("express").Router();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

// ✅ Define Mongoose schema
const researchPaperSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: [String],
  publisher: String,
  year: Number,
  abstract: String,
  topics: [String], // Will now include the query term
  url: String,
  journal: String,
});

// ✅ Define the model
const ResearchPaper = mongoose.model("ResearchPaper", researchPaperSchema);

<<<<<<< HEAD
// Fetch research papers from Semantic Scholar API
=======
router.post("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  if(!keyword) return res.json([])
  const regex = new RegExp(keyword, "i");
  const results = await ResearchPaper.find({
    $or: [
      { title: regex },
      { description: regex }
    ]
  });
  // console.log(results);
  res.json(results)
})


// Fetch research papers from CORE API
>>>>>>> 2e40207ab5e592bd1cf63c9d59f27478c2f7dd49
router.get("/data", async (req, res) => {
  let queryTerm = req.query.topic || "Science"; // Use query param or default
  let saveLimit = parseInt(req.query.limit) || 5; // Limit the number of saved papers (default: 5)
  let apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY;

  try {
    console.log(`📚 Fetching research papers for query: ${queryTerm} from Semantic Scholar`);

    // ✅ API URL
    const API_URL = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(queryTerm)}&fields=title,authors.name,year,abstract,url,venue,tldr&limit=10`;

    // ✅ Add API key to headers
    const headers = apiKey ? { "x-api-key": apiKey } : {};

    // Fetch data from Semantic Scholar API
    const response = await axios.get(API_URL, { headers });

    if (!response.data || !response.data.data) {
      throw new Error("No research papers found.");
    }

    let savedCount = 0;
    const papers = response.data.data;

    for (let paper of papers) {
      // ✅ Stop saving if the limit is reached
      if (savedCount >= saveLimit) break;

      // ✅ Only save papers with an abstract
      if (!paper.abstract) continue;

      const existingPaper = await ResearchPaper.findOne({ title: paper.title });

      if (!existingPaper) {
        const newPaper = new ResearchPaper({
          title: paper.title || "No Title",
          author: paper.author ? paper.author.map(a => a.name) : ["Unknown Author"],
          publisher: paper.venue || "Unknown Publisher",
          year: paper.year || new Date().getFullYear(),
          abstract: paper.abstract, // ✅ Guaranteed to exist now
          topics: [queryTerm], // ✅ Set topics to the search query
          url: paper.url || "N/A",
          journal: paper.venue || "N/A",
        });

        await newPaper.save();
        savedCount++;
      }
    }

    res.json({ message: "Research papers processed", newPapersAdded: savedCount });
  } catch (error) {
    console.error("❌ Error fetching Semantic Scholar data:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;
