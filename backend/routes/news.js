const router = require('express').Router();
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("❌ Missing API key! Check your .env file.");
  process.exit(1);
}

// Define Mongoose schema
const newsSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: { type: String, unique: true }, // Prevent duplicate articles by title
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  topic: String
});

const News = mongoose.model("News", newsSchema);

const API_URL = `https://newsapi.org/v2/everything?q=science&pageSize=10&apiKey=${API_KEY}`;

router.post("/getById", async (req, res) => {
  // console.log(req.body.itemId)
  const newsById = await News.findById(req.body.itemId)
  res.json({newsById});
})

router.get("/shuffle", async (req, res) => {
  const shuffledDocs = await News.aggregate([{ $sample: { size: await News.countDocuments() } }]);
  res.json(shuffledDocs)
})

router.post("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  if(!keyword) return res.json([])
  const regex = new RegExp(keyword, "i");
  const results = await News.find({
    $or: [
      { title: regex },
      { description: regex }
    ]
  });
  // console.log(results);
  res.json(results)
})


router.get("/data", async (req, res) => {
  try {
    // Get the query term from the request query, default to "Ocean" if not provided
    let queryTerm = "Ocean";

    console.log(`📢 Fetching news for query: ${queryTerm}`);

    const API_URL = `https://newsapi.org/v2/everything?q=${queryTerm}&pageSize=11&apiKey=${API_KEY}`;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let savedCount = 0;

    const LIMIT = 5; // Set a limit on the number of articles to save

    for (let article of data.articles) {
      if (savedCount >= LIMIT) break; // Stop once the limit is reached

      const existingArticle = await News.findOne({ title: article.title });

      if (!existingArticle) {
        const newsArticle = new News({
          source: article.source,
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content,
          topic: queryTerm,
        });

        await newsArticle.save();
        savedCount++;
      }
    }

    res.json({ message: "News processed", newArticlesAdded: savedCount });
  } catch (error) {
    console.error("❌ Error fetching API data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve stored news articles
router.get("/get-news", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    console.error("❌ Error retrieving news:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
