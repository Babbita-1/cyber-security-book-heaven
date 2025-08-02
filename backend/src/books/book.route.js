const express = require('express');
const Book = require('./book.model');
const { createBook, getAllBooks, getSingleBook, updateBook, deleteBook, searchBooks, getRecommendedBooks } = require('./book.controller');
const { verifyToken } = require('../middleware/auth');
const { hasPermission, PERMISSIONS } = require('../middleware/roles');

const router = express.Router();

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book (Admin only)
router.post("/create-book", verifyToken, hasPermission(PERMISSIONS.CREATE_BOOK), createBook);

// get all books (All users)
router.get("/", verifyToken, hasPermission(PERMISSIONS.READ_BOOK), getAllBooks);

// search books endpoint (All users)
router.get("/search", verifyToken, hasPermission(PERMISSIONS.READ_BOOK), searchBooks);

// get recommended books endpoint (All users)
router.get("/recommended", verifyToken, hasPermission(PERMISSIONS.READ_BOOK), getRecommendedBooks);

// single book endpoint (All users)
router.get("/:id", verifyToken, hasPermission(PERMISSIONS.READ_BOOK), getSingleBook);

// update a book endpoint (Admin only)
router.put("/edit/:id", verifyToken, hasPermission(PERMISSIONS.UPDATE_BOOK), updateBook);

// delete a book endpoint (Admin only)
router.delete("/:id", verifyToken, hasPermission(PERMISSIONS.DELETE_BOOK), deleteBook);

module.exports = router;
