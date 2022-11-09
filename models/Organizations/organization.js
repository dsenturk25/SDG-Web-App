
const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  projects_created: [
    project = {
      type: mongoose.Types.ObjectId
    }
  ],

  organization_type: { // school based, NGO, Government supported
    type: String,
    required: true,
  },

  description: {
    type: String,
    trim: true
  },

  photo: {
    type: Buffer
  },

  associated_school: {
    Type: String, 
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
  ]

})


const Organization = mongoose.model("Organizations", organizationSchema);

module.exports = Organization;
