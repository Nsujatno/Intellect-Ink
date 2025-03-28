const router = require('express').Router()
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

if (!GOOGLE_BOOKS_API_KEY) {
  console.error("❌ Missing Google Books API key! Check your .env file.");
  process.exit(1);
}

// Mongoose schema
const bookSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  authors: [String],
  publisher: String,
  publishedDate: String,
  description: String,
  pageCount: Number,
  categories: [String],
  language: String,
  previewLink: String,
  thumbnail: String,
});

const Book = mongoose.model("Book", bookSchema);


router.get("/search", async (req, res) => {
  // console.log(req.body.keyword);
  keyword = req.body.keyword
  const results = await Book.find({ description: new RegExp(keyword, "i") });
  // console.log(results);
  res.json(results)
})


// Fetch books and save to DB, avoiding duplicates
router.get("/data", async (req, res) => {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${GOOGLE_BOOKS_API_KEY}`;

  try {
    console.log("📚 Fetching books from:", API_URL);
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let savedCount = 0;

    for (let item of data.items || []) {
      const volumeInfo = item.volumeInfo;
      const existingBook = await Book.findOne({ title: volumeInfo.title });

      if (!existingBook) {
        const book = new Book({
          title: volumeInfo.title,
          authors: volumeInfo.authors || [],
          publisher: volumeInfo.publisher,
          publishedDate: volumeInfo.publishedDate,
          description: volumeInfo.description,
          pageCount: volumeInfo.pageCount,
          categories: volumeInfo.categories || [],
          language: volumeInfo.language,
          previewLink: volumeInfo.previewLink,
          thumbnail: volumeInfo.imageLinks?.thumbnail,
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
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("❌ Error retrieving books:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;