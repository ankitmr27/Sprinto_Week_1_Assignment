// router for book related apis
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

// GET all books
router.get("/", bookController.getAllBooks);

// GET book by id
router.get("/:id", bookController.getBookById);

// POST create new book
router.post("/", bookController.createBook);

// PUT update book by id
router.put("/:id", bookController.updateBook);

// DELETE delete book by id
router.delete("/:id", bookController.deleteBook);

module.exports = router;
