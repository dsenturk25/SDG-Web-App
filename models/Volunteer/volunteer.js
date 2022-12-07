
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const { sendConfirmationEmail } = require("../../utils/sendEmail");

const volunteerSchema = mongoose.Schema({

    name: {
        type: String,
        trim: true,
    },

    surname: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    school_number: {
      type: Number,
      trim: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    school: {
      type: String,
      trim: true,
    },

    projects: [
      project = {
        type: mongoose.Types.ObjectId
      }
    ],

    gender: {
      type: String,
      trim: true,
      enum: ["m", "f"]
    },

    birth_date: {
      type: Object,
      default: {
        day: "dd",
        month: "mm",
        year: "yy"
      }
    },

    phone_number: {
      type: String,
      trim: true
    },

    country: {
      type: String,
      trim: true
    },

    city: {
      type: String,
      trim: true
    },

    isAccountCompleted: {
      type: Boolean,
      default: false
    },

    isEmailConfirmed: {
      type: Boolean,
      default: false
    }
})

volunteerSchema.statics.createVolunteer = function(body, callback) {

  Volunteer.findOne({email: body.email}).then(volunteer => {
    if (volunteer) return callback("email_not_unique", null);
  });

  const newVolunteer = new Volunteer(body);

  if (newVolunteer) {

    newVolunteer.save();
    sendConfirmationEmail(body.email);
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

  Volunteer.findById(body.volunteer_id, (err, volunteer) => {
    if (err || !volunteer) return callback("user_not_found");
    if (volunteer) {

      volunteer.projects.push(body.project_id);
      volunteer.save();

      Project.findById(body.project_id, (err, project) => {
        if (err) return callback("project_not_found");
        project.attendants.push((volunteer._id).toString());
        project.save();
        return callback(null, project);
      })
    }
  });

}

volunteerSchema.statics.exitProject = function (body, callback) {
  Volunteer.findById(body.volunteer_id, (err, volunteer) => {
    if (err) return callback("user_not_found");
    if (volunteer) {

      const newProjectsArray = volunteer.projects.filter((value) => {
        return value != body.project_id
      })

      volunteer.projects = newProjectsArray;
      volunteer.save();


      Project.findById(body.project_id, (err, project) => {
        if (err) return callback("project_not_found");
        const newAttendantsArray = project.attendants.filter((value) => {
          return value != body.volunteer_id;
        })

        project.attendants = newAttendantsArray;
        project.save();
        return callback(null, project);
      })
    }
  });
}

volunteerSchema.pre('save', hashpassword);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
