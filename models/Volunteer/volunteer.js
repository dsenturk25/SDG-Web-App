

const mongoose = require("mongoose");
const hashpassword = require("./functions/hashPassword");
const verifypassword = require("./functions/verifyPassword");

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
        minlength: 4,
    },

    school: {
      type: String,
      trim: true,
      required: true,
    },

    projects: [
      project = {
        type: mongoose.Schema.Types.ObjectId
      }
    ],

    gender: {
        type: String,
        trim: true,
        required: true
    },

    birth_date: {
      type: Object,
      required: true
    }

})

volunteerSchema.statics.createVolunteer = function(body, callback) {
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

volunteerSchema.pre('save', hashpassword);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
