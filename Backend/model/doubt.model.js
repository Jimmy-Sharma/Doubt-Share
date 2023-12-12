const mongoose=require("mongoose")

const doubtSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ['Technical', 'Non-Technical'],
  },
  details: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = { Doubt };