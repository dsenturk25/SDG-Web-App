

const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");

const volunteerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },

    school: {
      type: String,
      trim: true,
      required: true,
    },

    projects: [
      project = {
        name: {
          type: String
        },
        _id: {
          type: mongoose.Types.ObjectId
        }
      }
    ],

    gender: {
        type: String,
        trim: true,
        required: true
    },

    birth_date: {
      type: Object,
      required: true,
      default: {
        day: "dd",
        month: "mm",
        year: "yy"
      }
    }

})

volunteerSchema.statics.createVolunteer = function(body, callback) {

  Volunteer.findOne({email: body.email}).then(volunteer => {
    if (volunteer) return callback("email_not_unique", null);
  });

  const newVolunteer = new Volunteer(body);

  if (newVolunteer) {

    newVolunteer.save();
    return callback(null, newVolunteer);
  }

  return callback("bad_request");
}

volunteerSchema.statics.loginVolunteer = function (body, callback) {

  Volunteer.findOne({email: body.email}).then(volunteer => {
    if (!volunteer) return callback("user_not_found");

    verifypassword(body.password, volunteer.password, (res) => {
      if (res) return callback(null, volunteer);
      
      return callback("verify_error", null);
    })
  });
}

volunteerSchema.statics.findVolunteerById = function (body, callback) {
  
  Volunteer.findById(mongoose.Types.ObjectId(body._id), (err, volunteer) => {;
    if (err || !volunteer) return callback("user_not_found");
    callback(null, volunteer);
  })

}

volunteerSchema.statics.joinProject = function (body, callback) {

  
  Volunteer.findById(body.volunteerId, (err, volunteer) => {
    if (err || !volunteer) return callback("user_not_found");
    if (volunteer) {

      const newProjectsArray = volunteer.projects.push({
        name: body.project_name,
        _id: body.project_id
      });

      Volunteer.updateOne(body.volunteerId, {projects: newProjectsArray}, (err, volunteer) => {
        if (err) return callback("update_failure");
        return callback(null, volunteer);
      })
  }
  });
}

volunteerSchema.statics.exitProject = function (body, callback) {
  Volunteer.findById(body.volunteerId, (err, volunteer) => {
    if (err) return callback("user_not_found");
    if (volunteer) {

      const newProjectsArray = volunteer.projects.filter(function(value) {
        return value._id != body.project_id
      })

      Volunteer.updateOne(body.volunteer_id, {projects: newProjectsArray}, (err, volunteer) => {
        if (err) return callback("update_failure");
        return callback(null, volunteer);
      })
    }

  });
}

volunteerSchema.pre('save', hashpassword);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
