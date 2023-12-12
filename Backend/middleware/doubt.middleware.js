const jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../model/user.model.js");
const { Doubt } = require("../model/doubt.model.js");


const createDoubt = async (req, res, next) => {
  try {
    const { _id, subject, details, token } = req.body;
    console.log('userId:', _id);
    const studentData = await UserModel.findById(_id);
    console.log('Student:', studentData);
    if (!studentData) {
      res.status(404).json({ msg: "User not found" });
    }

    const doubt = new Doubt({
      student: _id,
      subject,
      details
    });
    await doubt.save();
    studentData.doubts.push(doubt._id);
    await studentData.save();
    res.status(201).json({ message: 'Doubt created successfully', doubt });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};


const getDoubtHistory = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(req.query)

    let user = await UserModel.findById(id).populate({ path: 'doubts'});
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const doubts = user.doubts;
    res.status(200).json({ doubts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createDoubt, getDoubtHistory };

