require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product-routes")
const bookRoutes = require("./routes/book-routes")

const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected successfully!")
})
.catch(error => console.log("Error to connect DB", error)) 

//use middlewares
app.use(express.json())

//routes 
app.use("/products", productRoutes)
app.ues("reference", bookRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})