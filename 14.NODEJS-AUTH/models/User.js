const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,   // data type
        required: true, // required field
        unique: true,   // unique username
        trim: true // removes whitespace
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('User', userSchema);