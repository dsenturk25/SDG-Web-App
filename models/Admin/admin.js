
const mongoose = require("mongoose");
const verifypassword = require("../../utils/verifyPassword");
const hashpassword = require("../../utils/hashPassword");
const Sdg = require("../SDGs/sdg");
const Organization = require("../Organizations/organization");
const Volunteer = require("../Volunteer/volunteer");
const Project = require("../Projects/project");

const adminSchema = mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  name_surname: {
    type: String,
    required: true,
    trim: true
  },

  admin_type: {
    type: String,
    enum: ["teacher", "student"]
  }

})

adminSchema.statics.createAdmin = function (body, callback) {
  Admin.findOne({email: body.email}).then(admin => {
    if (admin) return callback("email_not_unique", null);
  });

  const newAdmin = new Admin(body);
  if (newAdmin) {
    newAdmin.save();

    return callback(null, newAdmin);
  }
  return callback("bad_request");
}

adminSchema.statics.loginAdmin = function (body, callback) {
  
  Admin.findOne({email: body.email}).then(admin => {
    if (!admin) return callback("user_not_found");

    verifypassword(body.password, admin.password, (res) => {
      if (res) return callback(null, admin);
      
      return callback("verify_error", null);
    })
  });
}

adminSchema.statics.findAdminById = function (body, callback) {
  Admin.findById(mongoose.Types.ObjectId(body._id), (err, admin) => {;
    if (err || !admin) return callback("user_not_found");
    callback(null, admin);
  })
}

adminSchema.statics.createSdgGoal = function (body, callback) {
  const newSdg = new Sdg(body);
  if (newSdg) {
    newSdg.save();

    return callback(null, newSdg);
  }
  return callback("bad_request");
}

adminSchema.statics.approveOrganizationsWaitlist = function (body, callback) {

  Organization.findByIdAndUpdate(body._id, {isOnWaitList: false}, (err, organization) => {
    if (err) return callback("update_failure");
    return callback(null, organization);
  })
}

adminSchema.statics.deleteOrganization = function (body, callback) {

  Organization.findByIdAndDelete(body._id, (err, organization) => {
    if (err) return callback("delete_failed");
    return callback(null, organization);
  })
}

adminSchema.statics.deleteSdg = function (body, callback) {

  Sdg.findByIdAndDelete(body._id, (err, sdg) => {
    if (err) return callback("delete_failed");
    return callback(null, sdg);
  })
}

adminSchema.statics.deleteVolunteer = function (body, callback) {

  Volunteer.findByIdAndDelete(body._id, (err, volunteer) => {
    if (err) return callback("delete_failed");
    return callback(null, volunteer);
  })
}

adminSchema.statics.deleteProject = function (body, callback) {

  Project.findByIdAndDelete(body._id, (err, project) => {
    if (err) return callback("delete_failed");
    return callback(null, project);
  })
}

adminSchema.statics.fetchVolunteers = function (body, callback) {
  Volunteer.find(body, (err, volunteersArray) => {
    if (err) return callback("fetch_failed");
    return callback(null, volunteersArray)
  })
}

adminSchema.statics.fetchOrganizations = function (body, callback) {
  Organization.find(body, (err, organizationsArray) => {
    if (err) return callback("fetch_failed");
    return callback(null, organizationsArray)
  })
}

adminSchema.statics.fetchProjects = function (body, callback) {
  Project.find(body, (err, projectsArray) => {
    if (err) return callback("fetch_failed");
    return callback(null, projectsArray)
  })
}

adminSchema.statics.fetchSdgs = function (body, callback) {
  Sdg.find(body, (err, sdgArray) => {
    if (err) return callback("fetch_failed");
    return callback(null, sdgArray)
  })
}

adminSchema.pre("save", hashpassword);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
