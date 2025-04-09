const express = require('express');

const app = express();

//Middlewares
app.use(express.json());

let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' }, 
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }    
]

//intro route 
app.get('/', (req, res) => {
    res.json({message : "welcome to our book store api"});
});

//get all books 
app.get("/all-books", (req, res) => {
    res.json(books);
});

//get a single book
app.get("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find(item => item.id === parseInt(bookId));
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "Book not found"});
    }
});

//add a new book
app.post("/add-book", (req, res) => {
    const newBook = req.body;
    console.log(newBook);
    books.push(newBook);
    res.status(201).json({message: "Book added successfully"});
    console.log(books);
})

//update a book
app.put("/update-book/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find(item => item.id === parseInt(bookId));
    if (book) {
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        res.status(200).json({message: `Book ${req.params.id} updated successfully`});
    } else {
        res.status(404).json({message: "Book not found"});
    }
})

//Delete a book
app.delete(("delete-book/:id"), (req, res) =>  {
    const bookId = req.params.id;
    const bookIndex = books.findIndex(item => item.id === parseInt(bookId));
    if (bookIndex >= 0) {           //checking if the book exists
        books.splice(bookIndex, 1);
        res.status(200).json({message: `Book ${req.params.id} deleted successfully`});
    } else {
        res.status(404).json({message: "Book not found"});
    }
})

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
});
