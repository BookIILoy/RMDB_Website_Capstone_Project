const User = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
function genrateToken(body) {
    const {_id, firstname, lastname, username, email} = body;
    return jwt.sign({_id, firstname, lastname, username, email}, process.env.secretJWT, {
        expiresIn: "1d",
    })
}

module.exports = {
    //Login API
    userLogin:(req, res) => {
        const { email, password } = req.body;
        User.findOne({ email:email})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password).then((match) =>{
                    if(match){
                        const jsontoken = genrateToken(user);
                        return res.json({
                            success: 1,
                            token: jsontoken,
                            users: user,
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "Invalid Username or Password"
                        })
                    }
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid Username or Password"
                })
            }
        })
    },
    // Update user data by user id
    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then((user) => {
                if (user) {
                    // Generate a new token with the updated user data
                    const token = genrateToken(user);
                    return res.json({
                        success: 1,
                        message: "User data updated successfully",
                        token: token, // Include the new token in the response
                        user: user
                    });
                } else {
                    return res.json({
                        success: 0,
                        message: "User account not found in the database."
                    });
                }
            })
            .catch((error) => {
                return res.json({
                    success: 0,
                    message: "Error updating user data."
                });
            });
    },
    //Register API
    userRegister:(req, res) => {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, 10);
        User.findOne({ email: body.email}).then((user) => {
            if(user){
                return res.json({
                    success: 0,
                    message: "Email Already Exists"
                })
            }
            else{
                User.findOne({ username: body.username}).then((username) => {
                    if(username){
                        return res.json({
                            success: 0,
                            message: "Username Already Exists"
                        })
                    }
                    else{
                        User.insertMany([body]).then((result) => {
                            return res.json({
                                success: 1,
                                users : result
                            })
                        })
                    }
                })
            }
        })
    },
    // Get all users data
    getUsers: (req, res) => {
        User.find().then((users) => {
            return res.json({
                success: 1,
                users: users
            })
        })
    },
    // Get user data by user email
    getUserByEmail: (req, res) => {
        const { email } = req.body;
        User.findOne({ email:email})
        .then((users) => {
            if(users){
                return res.json({
                    success: 1,
                    user: users
                })
            }
            else{
                return res.json({
                    success: 0,
                    message: "User not found."
                })
            }
        })
    }
}