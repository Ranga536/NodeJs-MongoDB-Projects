const express = require("express");
const { getAllBooks, getBookById, addBook, updateBook, deleteBook, getAllBooks } = require("../controllers/book-controller");

//create express router
const router = express.Router();

//all routes that are related to books will be defined here
router.get("/get", getAllBooks);             //get all books
router.get("/get/:id", getBookById);          //get a single book by id
router.post("/add", addBook);                  //add a new book
router.put("/update/:id", updateBook);         //update a book by id
router.delete("/delete/:id", deleteBook);      //delete a book by id

module.exports = router; //export the router to be used in server.js