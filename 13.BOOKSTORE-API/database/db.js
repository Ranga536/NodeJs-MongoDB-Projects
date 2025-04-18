const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB connection successful");

    } catch(error) {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;