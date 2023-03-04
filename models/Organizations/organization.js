
const mongoose = require("mongoose");
const verifypassword = require("../../utils/verifyPassword");
const hashpassword = require("../../utils/hashPassword");
const Project = require("../Projects/project");
const Sdg = require("../SDGs/sdg");

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
      type: mongoose.Types.ObjectId,
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
  },

  phone_number: {
    type: String,
    required: true
  },

  volunteers: [
    volunteer = {
      type: mongoose.Types.ObjectId
    }
  ]

})


organizationSchema.statics.createOrganization = function (body, callback) {

  Organization.findOne({ email: body.email }).then(organization => {
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

  Organization.findOne({ email: body.email }).then(organization => {
    if (!organization) return callback("user_not_found");

    verifypassword(body.password, organization.password, (res) => {
      if (res) return callback(null, organization);

      return callback("verify_error", null);
    })
  });
}

organizationSchema.statics.findOrganizationById = function (body, callback) {

  Organization.findById(mongoose.Types.ObjectId(body._id), (err, organization) => {
    ;
    if (err || !organization) return callback("user_not_found");
    callback(null, organization);
  })

}

organizationSchema.statics.createProject = function (body, callback) {

  const newProject = new Project(body);

  if (newProject) {
    newProject.save();
  }

  Organization.findById(body.creator_id, (err, organization) => {
    if (err || !organization) return callback("user_not_found");
    if (organization) {

      organization.projects_created.push((newProject._id).toString());
      organization.save();
      return callback(null, organization);
    }

    if (body.sdg_goals.length) {
      for (let i = 0; i < body.sdg_goals.length; i++) {
        const sdgGoalId = body.sdg_goals[i];

        Sdg.findById(sdgGoalId, (err, sdg) => {
          if (err) return callback("bad_request");

          sdg.total_hours += body.duration;
          sdg.projects.push((newProject._id).toString());
          sdg.save();
          return callback(null, organization);
        })
      }
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
    if (err || !project) return callback("delete_failed");
  })

  Organization.findById(body.creator_id, (err, organization) => {
    if (err) return callback("delete_failed");

    const resArray = organization.projects_created.filter((val) => {
      return val != body._id
    })

    organization.projects_created = resArray;

    organization.save();
    return callback(null, organization);
  })
}

organizationSchema.statics.findProjectById = function (body, callback) {
  Organization.findById(body.organization_id, (err, organization) => {
    if (err) return callback("organization_not_found");
    const project = organization.projects_created.find((val) => {
      return val == body.project_id
    })

    return callback(null, project);
  })
}


organizationSchema.statics.findAllProjects = function (body, callback) {
  Organization.findById(body.organization_id, (err, organization) => {
    if (err) return callback("organization_not_found");

    return callback(null, organization.projects_created);
  })
}

organizationSchema.pre('save', hashpassword);

const Organization = mongoose.model("Organizations", organizationSchema);

module.exports = Organization;
