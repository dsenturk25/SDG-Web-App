
const mongoose = require("mongoose");

const sdgSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 

  number: {
    type: Number,
    required: true,
  },

  image: {
    type: Buffer,
    required: true
  },

  projects: [
    project = {
      type: mongoose.Types.ObjectId,
    }
  ],

  total_hours: {
    type: Number,
    default: 0
  },

  total_attendants: {
    type: Number,
    default: 0
  }
})

const Sdg = mongoose.model("SDGs", sdgSchema);

module.exports = Sdg;
