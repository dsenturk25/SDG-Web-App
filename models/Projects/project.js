
const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  creator: {
    type: mongoose.Types.ObjectId
  },

  sdg_goals: [
    sdg_goal = {
      type: mongoose.Types.ObjectId
    }
  ],

  photo: {
    type: Buffer,
    required: true
  },

  attendants: [
    attendant = {
      type: mongoose.Types.ObjectId
    }
  ]
})

const Project = mongoose.model("Projects", projectsSchema);

module.exports = Project;
