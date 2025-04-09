const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/welcome", authMiddleware, (req, res) => {

    const {username, userId, role} = req.userInfo;

    res.status(200).json({
        success: true,
        message: "Welcome to home page",
        user: {
            username,
            _id: userId,
            role
        }
    })
})

module.exports = router;