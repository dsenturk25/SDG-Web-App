
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
    required: false
  },

  projects: [
    project = {
      type: mongoose.Types.ObjectId,
    }
  ]
})

const Sdg = mongoose.model("SDGs", sdgSchema);

module.exports = Sdg;
