const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller
const registerUser = async(req, res) => {
    try{
        const {username, email, password, role} = req.body;

        //check if user already exists
        const checkExistingUser = await User.findOne({$or : [{username}, {email}]});

        if(checkExistingUser) {
            res.status(400).json({
            success : false,
            message : "user already existed with us! please try with other email"
            })
        }

        //hash user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user and save it to database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newUser.save();

        if(newUser) {
            res.status(200).json({
                success: true,
                message: "User registered successfully! please login to continue"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register user! please try again later"
            })
        }


    } catch(error) {
        console.log("Unable to register", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong! please try again later"
        });
    }
}

//login controller
const loginUser = async(req, res) => {
    try{
        const {username, password} = req.body;

        //check if user exists
        const user = await User.findOne({username});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials! please try again"
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials! please try again'
            })
        } 

        //generate token for user authentication
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});


        //const refreshToken = jwt.sign({userId: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

        //store token in cookie
        //res.cookie("refreshToken", refreshToken, {httpOnly: true, path: "/auth/refresh_token"});
        //res.cookie("accessToken", accessToken, {httpOnly: true, path: "/"});

        //send token to user
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken
        })

    } catch(error) {
        console.log("Unable to register", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong! please try again later"
        });
    }
}

const changePassword = async(req, res) => {
    try{
        const userId = req.userInfo.userId;
        const {oldPassword, newPassword} = req.body;

        //find the current logged in user by userId
        const user = await User.findById(userId);

        //check if user exists
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found! please try again"
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials! please try again'
            })
        }

        //hash new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update user password
        await User.findByIdAndUpdate(userId, {password: newHashedPassword});

        //or can also use
        //user.password = newHashedPassword;
        //await user.save();
        
        res.status(200).json({
            success: true,
            message: "Password changed successfully"

    })
}

    catch(error){
        console.log("Unable to change password", error)
        res.status(500).json({
            success: false,
            message: "Something went wrong! please try again later"
        });
    }
}

//forget password controller
// const forgetPassword = async(req, res) => {
    //     try{
        //         const {email} = req.body;
        
        //         //check if user exists
        //         const user   = await User.findOne({
            //             email
            //         });
            
            //         if(!user) {
                //             return res.status(400).json({
                    //                 success: false,
                    //                 message: "User not found! please try again"
                    //             })
                    //         }
                    
                    //         //generate token for user authentication
                    //         const accessToken = jwt.sign({
                        //             userId: user._id,
                        //             email: user.email
                        //         }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
                        
                        //         //store token in cookie
                        //         res.cookie("accessToken", accessToken, {httpOnly: true, path: "/"});
                        
                        //         //send token to user
                        //         res.status(200).json({
                            //             success: true,
                            //             message: "Reset password link sent to your email"
                            //         })
                            
                            //     } catch(error) {
                                //         console.log("Unable to reset password", error)
                                //         res.status(500).json({
                                    //             success: false,
                                    //             message: "Something went wrong! please try again later"
                                    //         });
                                    //     }
                                    // }

module.exports = {registerUser, loginUser, changePassword};