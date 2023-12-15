const { Usercontroller } = require("../Controllers/usercontroller");
const express = require("express");
const userroute = express.Router();

userroute.post("/register", Usercontroller.register);
userroute.post("/login", Usercontroller.Login);

module.exports = { userroute };
