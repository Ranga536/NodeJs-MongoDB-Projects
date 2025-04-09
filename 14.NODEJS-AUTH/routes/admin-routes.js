const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to admin home page"
    })
})

module.exports = router;