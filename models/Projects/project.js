
const mongoose = require("mongoose");
const async = require("async");
const Sdg = require("../SDGs/sdg");

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
    required: false,
    default: {
      day: "dd",
      month: "mm",
      year: "yy",
    }
  },

  finish_date: {
    type: Object,
    required: false,
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

  city: {
    type: String,
    trim: true,
  },

  sessions: [
    session = {
      session_start_time: {
        type: String
      },
      session_duration: {
        type: String
      },
      session_environment: {
        type: String
      },
      session_link_to_online_environment: {
        type: String,
        trim: true
      },
      session_address: {
        type: String
      },
      session_date: {
        type: String
      },
    }
  ],

  isCompleted: {
    type: Boolean,
    default: false
  },

  isTodaysPick: {
    type: Boolean,
    default: false,
  },

  quota: {
    type: Number,
    required: true,
  }
})

projectsSchema.statics.addSessionManual = function (body, callback) {

  const session = {
    session_date: body.session_date,
    session_address: body.session_address,
    session_environment: body.session_environment,
    session_start_time: body.session_start_time,
    session_duration: body.session_duration,
    session_link_to_online_environment: body.session_link_to_online_environment
  }

  Project.findById(body._id, (err, project) => {

    if (err) return callback("create_failed");

    project.sessions.push(session);

    async.timesSeries(project.sdg_goals.length, (i, next) => {
      const sdgId = project.sdg_goals[i];
      Sdg.findById(sdgId, (err, sdg) => {
        if (err) return callback("create_failed");
        const totalHour = parseInt(body.session_duration.split(":")[0]);
        const totalMinute = parseInt(body.session_duration.split(":")[1]);

        const prevHour = parseInt(sdg.total_hours.split(":")[0])
        const prevMinute = parseInt(sdg.total_hours.split(":")[1]);

        const hour = totalMinute + prevMinute >= 60 ? totalHour + prevHour + 1 : totalHour + prevHour;
        const minute = totalMinute + prevMinute >= 60 ? (totalMinute + prevMinute) - 60 : totalMinute + prevMinute;

        sdg.total_hours = `${hour}:${minute}`;
        sdg.save();
        next();
      })
    }, (err) => {
      if (err) return callback("create_failed");
      project.save();
      return callback(null, project);
    })
  })
}

projectsSchema.statics.updateTodaysPicks = function (body, callback) {

  Project.find({}, (err, projects) => {
    if (err) return callback("bad_request");
    const size = projects.length;
    const todaysPicksIndexes = [];

    async.timesSeries(projects.length, (i, next) => {
      const project = projects[i];
      project.isTodaysPick = false;
      project.save();
    }, (err) => {
      let i = 0;
      while (i < 2) {
        const randomIndex = Math.floor(Math.random() * size);
        if (todaysPicksIndexes.includes(randomIndex)) continue;
        todaysPicksIndexes.push(randomIndex)
        i++;
      }

      projects[todaysPicksIndexes[0]].isTodaysPick = true;
      projects[todaysPicksIndexes[0]].save();
      projects[todaysPicksIndexes[1]].isTodaysPick = true;
      projects[todaysPicksIndexes[1]].save();
      return callback(null, todaysPicksIndexes);
    })
  })
}

const Project = mongoose.model("Projects", projectsSchema);

module.exports = Project;
