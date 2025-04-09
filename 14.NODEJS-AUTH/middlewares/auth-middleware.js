const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Auth middleware is called");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied! please login to continue"
        })
    }

    //decode token
    try{

        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded token info", decodedTokenInfo);

        req.userInfo = decodedTokenInfo;

        next();

    } catch(error) {
        console.log("Unable to decode token", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! please try again later"
        });
    }

    
}

module.exports = authMiddleware;