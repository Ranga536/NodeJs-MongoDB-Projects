const Book = require('../models/book-model');

const getAllBooks = async(req, res) => {
    try {
        const allBooks = await Book.find({});
        if(allBooks.length > 0) {
            res.status(200).json({
                success : true,
                message : "All books fetched successfully",
                data : allBooks
            });
        } else {
            res.status(404).json({
                success : false,
                message : "No books found"});
        }
    }catch(error) {
        console.log("Error in getting all books", error);
        res.status(500).json({success : false, message : "Something went wrong, please try again later"});
    }

}

const getSingleBookByID = async(req, res) => {
    try{
        const bookID = req.params.id;
        const book = await Book.findById(bookID);
        if(book) {
            res.status(200).json({
                success : true,
                message : "Book fetched successfully",
                data : book
            });
        } else {
            res.status(404).json({
                success : false,
                message : "Book not found"
            });
        }
    } catch(error) {
        console.log("Error in getting book by ID", error);
        res.status(500).json({success : false, message : "Something went wrong, please try again later"});
    }
}

const addBook = async(req, res) => {
    try {
        const newBookFormData = req.body;
        // const newBook = new Book(newBookFormData);
        // const savedBook = await newBook.save();
        const savedBook = await Book.create(newBookFormData);

        if(savedBook) {
            res.status(201).json({
                success :true,
                message : "Book added successfully",
                data : savedBook
            });
        } else {
            res.status(400).json({message : "Book addition failed"});
        }

    } catch(error) {
        console.log("Book addition failed", error);
        res.status(500).json({success : false, message : "Something went wrong, please try again later"});
    }
}

const updateBook = async(req, res) => {
    try {
        
        const bookID = req.params.id;
        const updatedBookData = req.body;
        const updatedBook = await Book.getSingleBookByIDAndUpdate(bookID, updatedBookData, {new : true}); //new : true returns the updated document
        if(updatedBook) {
            res.status(200).json({
                success : true,
                message : "Book updated successfully",
                data : updatedBook
            });
        } else {
            res.status(400).json({success : false, message : "Book update failed due to invalid data. please try again"});
        }

    }catch(error) {
        console.log("Error in updating book", error);
        res.status(500).json({success : false, message : "Something went wrong, please try again later"});
    }
}

const deleteBook = async(req, res) => {
    try{

        const bookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookID); //find the book by id and delete it and return the deleted book
        
        if (deleteBook) {
            res.status(200).json({
                success : true,
                message : "Book deleted successfully",
                data : deletedBook
            });
        } else {
            res.status(404).json({success : false, message : "Book not found"});
        }

    } catch(error) {
        console.log("Error in deleting book", error);
        res.status(500).json({success : false, message : "Something went wrong, please try again later"});
    }
}

module.exports = {getAllBooks, getSingleBookByID, addBook, updateBook, deleteBook};