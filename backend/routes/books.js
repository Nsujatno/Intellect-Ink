const router = require('express').Router();
require("dotenv").config();
const mongoose = require("mongoose");

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

if (!GOOGLE_BOOKS_API_KEY) {
  console.error("❌ Missing Google Books API key! Check your .env file.");
  process.exit(1);
}

// Mongoose schema
const bookSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: [String], // Using 'author' as an array
  publisher: String,
  publishedDate: String,
  description: String,
  pageCount: Number,
  categories: [String],
  language: String,
  previewLink: String,
  thumbnail: String,
  topic: String,
});

const Book = mongoose.model("Book", bookSchema);

<<<<<<< HEAD
// Fetch books and save to DB, with a limit to avoid duplicates
router.get("/data", async (req, res) => {
=======

router.post("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  if(!keyword) return res.json([])
  const regex = new RegExp(keyword, "i");
  const results = await Book.find({
    $or: [
      { title: regex },
      { description: regex }
    ]
  });
  // console.log(results);
  res.json(results)
})


// Fetch books and save to DB, avoiding duplicates
router.get("/data", async (req, res) => {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${GOOGLE_BOOKS_API_KEY}`;

>>>>>>> 2e40207ab5e592bd1cf63c9d59f27478c2f7dd49
  try {
    let queryTopic = "History";
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${queryTopic}&key=${GOOGLE_BOOKS_API_KEY}`;
    console.log("📚 Fetching books from:", API_URL);

    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return res.json({ message: "No books found from API." });
    }

    let savedCount = 0;
    const LIMIT = 5; // Maximum number of books to save per request

    for (let item of data.items) {
      if (savedCount >= LIMIT) break; // Stop once limit is reached

      const volumeInfo = item.volumeInfo;
      const exists = await Book.findOne({ title: volumeInfo.title });

      if (!exists) {
        const book = new Book({
          title: volumeInfo.title || "Unknown Title",
          author: volumeInfo.authors || ["Unknown Author"], // Kept 'author' instead of 'authors'
          publisher: volumeInfo.publisher || "Unknown Publisher",
          publishedDate: volumeInfo.publishedDate || "Unknown Date",
          description: volumeInfo.description || "No description available.",
          pageCount: volumeInfo.pageCount || 0,
          categories: volumeInfo.categories || ["Uncategorized"],
          language: volumeInfo.language || "Unknown",
          previewLink: volumeInfo.previewLink || "N/A",
          thumbnail: volumeInfo.imageLinks?.thumbnail || "", // Handle missing images
          topic: queryTopic,
        });

        await book.save();
        savedCount++;
      }
    }

    res.json({ message: "Books processed", newBooksAdded: savedCount });
  } catch (error) {
    console.error("❌ Error fetching API data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get stored books from MongoDB
router.get("/get-books", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (error) {
    console.error("❌ Error retrieving books:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
