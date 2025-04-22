const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");
const axios = require('axios');


// Define Mongoose schema for storing articles
const articleSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: { type: String, unique: true }, // Prevent duplicate articles by title
  description: String,
  url: { type: String, unique: true }, // Prevent duplicate articles by URL
  urlToImage: String,
  publishedAt: Date,
  content: String,
  topic: String,
});

const Article = mongoose.model("Article", articleSchema);

const API_KEY = process.env.NYT_API_KEY;

router.post("/getById", async (req, res) => {
  // console.log(req.body.itemId)
  const articleById = await Article.findById(req.body.itemId)
  res.json({articleById});
})

router.get("/shuffle", async (req, res) => {
  const shuffledDocs = await Article.aggregate([{ $sample: { size: await Article.countDocuments() } }]);
  res.json(shuffledDocs)
})

router.post("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  topic = req.body.topic
  if(!keyword) return res.json([])
  const regex = new RegExp(keyword, "i");
  const filter = {
    $or: [
      { title: regex },
      { description: regex }
    ]
  };

  if (topic) {
    filter.topic = topic; 
  }

  const results = await Article.find(filter);
  // console.log(results);
  res.json(results)
})

router.get("/data", async (req, res) => {
  let randomMedia = "technology"

  try {
    const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${randomMedia}&api-key=${API_KEY}`;
    console.log("📰 Fetching data from NYT API:", API_URL);

    const response = await fetch(API_URL); // Native fetch in Node.js 18+
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.response || !data.response.docs) {
      throw new Error("Expected articles but got an empty response.");
    }

    let savedCount = 0;
    const articles = data.response.docs;

    for (let article of articles) {
      const existingArticle = await Article.findOne({ url: article.web_url });

      if (!existingArticle) {
        const newArticle = new Article({
          source: article.source || { id: null, name: "New York Times" },
          author: article.byline?.original || "Unknown",
          title: article.headline.main,
          description: article.snippet,
          url: article.web_url,
          urlToImage: article.multimedia?.[0]?.url || "",
          publishedAt: article.pub_date,
          content: article.lead_paragraph,
        });

        await newArticle.save();
        savedCount++;
      }
    }

    res.json({ message: "Articles processed", newArticlesAdded: savedCount });
  } catch (error) {
    console.error("❌ Error fetching API data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve stored articles
router.get("/get-articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error("❌ Error retrieving articles:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;