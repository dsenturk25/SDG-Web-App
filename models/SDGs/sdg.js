
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
    type: Buffer
  },

  projects: [
    project = {
      type: mongoose.Types.ObjectId,
    }
  ],

  total_hours: {
    type: String,
    default: "0:00"
  },

  total_attendants: {
    type: Number,
    default: 0
  },

  imageName: {
    type: String,
    required: true
  }
})

const Sdg = mongoose.model("SDGs", sdgSchema);

module.exports = Sdg;
