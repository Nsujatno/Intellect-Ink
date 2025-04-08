const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");

// Define Mongoose schema for storing articles
const articleSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: { type: String, unique: true },
  description: String,
  url: { type: String, unique: true },
  urlToImage: String,
  publishedAt: Date,
  content: String,
  topic: String,
});

const Article = mongoose.model("Article", articleSchema);

const API_KEY = process.env.NYT_API_KEY;

router.get("/data", async (req, res) => {
  let queryTopic = "history";
  const LIMIT = 5; // Set the limit for the number of articles saved per request

  try {
    const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryTopic}&api-key=${API_KEY}`;
    console.log("📰 Fetching data from NYT API:", API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    if (!data.response || !data.response.docs) {
      throw new Error("Expected articles but got an empty response.");
    }

    let savedCount = 0;
    const articles = data.response.docs;

    for (let article of articles) {
      if (savedCount >= LIMIT) break; // Stop saving once the limit is reached

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
          topic: queryTopic,
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
