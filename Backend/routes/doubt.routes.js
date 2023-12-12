const express = require("express");
const { createDoubt, getDoubtHistory } = require("../middleware/doubt.middleware.js");
const { auth } = require("../middleware/auth.middleware.js");

const doubtRoutes = express.Router();

doubtRoutes.post('/create', auth, createDoubt);
doubtRoutes.get('/history', getDoubtHistory);



module.exports = { doubtRoutes };