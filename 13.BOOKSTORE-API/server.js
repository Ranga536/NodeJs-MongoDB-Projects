require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/book-routes");


const app = express();
const port = process.env.PORT || 5000;

//connect to database
connectDB();

//middleware express.json() used to parse incoming requests with JSON payloads 
app.use(express.json());

//importing the routes
app.use("/api/books", bookRoutes); //all routes related to books will start with /api/books

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

