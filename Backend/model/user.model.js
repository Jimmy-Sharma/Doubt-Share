const mongoose=require("mongoose")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['Student', 'Tutor'],
    required: true,
  },
  specialization: {
    type: String,
    enum: ['Technical', 'Non-Technical'],
    required: function () {
      return this.role === 'Tutor';
    },
  },
  doubts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doubt',
    },
  ],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };