// router for author related apis
const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.controller");

// GET all authors
router.get("/", authorController.getAllAuthors);

// GET author by id
router.get("/:id", authorController.getAuthorById);

// POST create new author
router.post("/", authorController.createAuthor);

// PUT update author
router.put("/:id", authorController.updateAuthor);

// DELETE delete author by id
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
