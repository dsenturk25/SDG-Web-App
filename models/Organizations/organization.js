
const mongoose = require("mongoose");
const verifypassword = require("../../utils/verifyPassword");
const hashpassword = require("../../utils/hashPassword");
const Project = require("../Projects/project");

const organizationSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

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

  projects_created: [
    project = {
      name: {
        type: String
      },
      _id: {
        type: mongoose.Types.ObjectId,
      }
    }
  ],

  organization_type: { // school based, NGO, Government supported
    type: String,
    required: true,
    enum: ["school_based", "ngo", "governmental"]
  },

  description: {
    type: String,
    trim: true
  },

  photo: {
    type: Buffer
  },

  associated_school: {
    type: String, 
    trim: true
  },

  contact_infos: [
    contact_info = {
      type: Object
    }
  ],

  completed_sdgs: [
    completed_sdg = {
      type: mongoose.Types.ObjectId
    }
  ],

  isOnWaitList: {
    type: Boolean,
    default: true
  }

})


organizationSchema.statics.createOrganization = function(body, callback) {

  Organization.findOne({email: body.email}).then(organization => {
    if (organization) return callback("email_not_unique", null);
  });

  const newOrganization = new Organization(body);
  if (newOrganization) {
    newOrganization.save();

    return callback(null, newOrganization);
  }
  return callback("bad_request");
}

organizationSchema.statics.loginOrganization = function (body, callback) {

  Organization.findOne({email: body.email}).then(organization => {
  if (!organization) return callback("user_not_found");

    verifypassword(body.password, organization.password, (res) => {
      if (res) return callback(null, organization);
      
      return callback("verify_error", null);
    })
  });
}

organizationSchema.statics.findOrganizationById = function (body, callback) {

  Organization.findById(mongoose.Types.ObjectId(body._id), (err, organization) => {;
    if (err || !organization) return callback("user_not_found");
    callback(null, organization);
  })

}

organizationSchema.statics.createProject = function (body, callback) {

  const newProject = new Project(body);
  
  if (newProject) {
    newProject.save();
    return callback(null, newProject);
  }

  Organization.findById(body.creator._id, (err, organization) => {
    if (err || !organization) return callback("user_not_found");
    if (organization) {

      const newProjectsArray = organization.projects_created.push({
        name: body.project_name,
        _id: body.project_id
      });

      Organization.updateOne(body.creator._id, {projects_created: newProjectsArray}, (err, organization) => {
        if (err) return callback("update_failure");
        return callback(null, organization);
      })
  }
  });
}

organizationSchema.statics.editProject = function (body, callback) {
  
  Project.findByIdAndUpdate(body._id, body, (err, organization) => {
    if (err) return callback("update_failed");
    return callback(null, organization);
  });
}

organizationSchema.statics.deleteProject = function (body, callback) {
  
  Project.findByIdAndDelete(body._id, (err, project) => {
    if (err) return callback("delete_failed");
    return callback(null, project);
  })
}

organizationSchema.pre('save', hashpassword);

const Organization = mongoose.model("Organizations", organizationSchema);

module.exports = Organization;
