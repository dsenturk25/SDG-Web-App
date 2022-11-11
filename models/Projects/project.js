
const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  creator_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  creator_name: {
    type: String,
    required: true
  },

  sdg_goals: [
    sdg_goal = {
      type: mongoose.Types.ObjectId
    }
  ],

  photo: {
    type: Buffer,
  },

  attendants: [
    attendant = {
      type: mongoose.Types.ObjectId
    }
  ],

  environment: {
    type: String,
    required: true,
    enum: ["online", "face-to-face"]
  },

  link_to_online_environment: {
   type: String,
   trim: true 
  },

  address: {
    type: String,
    trim: true,
  },

  date: {
    type: Object,
    required:false,
    default: {
      day: "dd",
      month: "mm",
      year: "yy",
      hour: "hh",
      minute: "min"
    }
  }
})

const Project = mongoose.model("Projects", projectsSchema);

module.exports = Project;
