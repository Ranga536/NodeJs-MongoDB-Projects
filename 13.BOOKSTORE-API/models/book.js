const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Book title is required!"],
        trim : true,
        maxLength : [100, "Book title cannot exceed 100 characters"]
    },
    author : {
        type : String,
        required : [true, "Book author name is required!"],
        trim : true,
    },
    year : {
        type : Number,
        required : [true, "Book publication year is required!"],
        min : [1000, "Year must be greater than 1000"],
        max : [new Date().getFullYear(), "Year cannot be in the future"]
    },
    createdAt : {
        type : Date,
        default : Date.now  //current date and time by default
    }

})

module.exports = mongoose.model("Book", bookSchema); //exporting the model Book with the schema bookSchema