const Author = require("../models/Author");
const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async(req, res) => {
    try{
        const author = new Author(req.body);
        await author.save(); 

        res.status(201).json({
            success : true,
            message : "user created successfully!",
            data : author
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong!"
        })
    }
}

const createBook = async(req, res) => {
    try{
        const book = new Book(req.body);
        await book.save(); 

        res.status(201).json({
            success : true,
            message : "book added successfully!",
            data : book
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong!"
        })
    }
}

const getBookWithAuthor = async(req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate("author");

        if(!book) {
            return res.status(404).json({
                success : false,
                message : "Book Not Found!"
            })
        }

        res.status(200).json({
            success : true,
            message : "book fetched successfully",
            data : book
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something went wrong!"
        })
    }
}

module.exports = {createAuthor, createBook, getBookWithAuthor};