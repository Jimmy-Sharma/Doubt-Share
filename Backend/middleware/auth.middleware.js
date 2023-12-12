const jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../model/user.model");

const auth = async (req, res, next) => {
    try {
        const { _id, subject, details, token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Not Logged in' });
        }

        const decoded = jwt.verify(token, process.env.secret_code);
        const user = await UserModel.findById(decoded.userId);
        console.log("userData",user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.body._id = user
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { auth };
