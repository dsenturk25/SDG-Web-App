
const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  short_description: {
    type: String,
    trim: true
  },

  long_description: {
    type: String,
    trim: false
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
    enum: ["online", "face-to-face", "hybrid"]
  },

  start_date: {
    type: Object,
    required:false,
    default: {
      day: "dd",
      month: "mm",
      year: "yy",
    }
  },

  finish_date: {
    type: Object,
    required:false,
    default: {
      day: "dd",
      month: "mm",
      year: "yy",
    }
  },

  number_of_sessions: {
    type: Number,
  },

  start_time_of_each_session: {
    type: Object,
    default: {
      day: "dd",
      month: "mm",
      year: "yy",
    }
  },

  duration_of_each_session: {
    type: String,
  },

  link_to_online_environment: {
    type: String,
    trim: true 
   },
 
   address: {
     type: String,
     trim: true,
   },

  sessions: [
    session = {
      start_time: {
        type: String
      },
      duration: {
        type: String
      },
      environment: {
        type: String
      },
      link_to_online_environment: {
        type: String,
        trim: true 
       },
     
       address: {
         type: String,
         trim: true,
       },
    }
  ],

  isCompleted: {
    type: Boolean,
    default: false
  }

})

projectsSchema.statics.addSessionManual = function (body, callback) {
  
  const session = {
    address: body.address,
    environment: body.environment,
    start_time: body.start_time,
    duration: body.duration
  }

  Project.findById(body._id, (err, project) => {
    
    if (err) return callback("create_failed");

    project.sessions.push(session);
    project.save();
    return callback(null, project);
  })
}

const Project = mongoose.model("Projects", projectsSchema);

module.exports = Project;
