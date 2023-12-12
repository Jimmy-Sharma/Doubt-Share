const express = require("express");
const { login, logout, register } = require("../middleware/user.middleware")
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRoutes = express.Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get("/logout", logout);

module.exports = { userRoutes };