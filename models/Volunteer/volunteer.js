
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const Organization = require("../Organizations/organization");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");

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
    },

    confirmation_code: {
      type: Number,
    },

    joined_organizations: [
      {
        type: mongoose.Types.ObjectId
      }
    ]
})

volunteerSchema.statics.createVolunteer = function(body, callback) {

  Volunteer.findOne({email: body.email}).then(volunteer => {
    if (volunteer) return callback("email_not_unique", null);
  });

  const newVolunteer = new Volunteer(body);

  if (newVolunteer) {

    newVolunteer.confirmation_code = createConfirmationCode();

    newVolunteer.save();
    sendConfirmationEmail(newVolunteer);
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

      if (!volunteer.projects.includes(body.project_id)) {
        volunteer.projects.push(body.project_id);
      }
      volunteer.save();

      Project.findById(body.project_id, (err, project) => {
        if (err) return callback("project_not_found");

        if (!project.attendants.includes((volunteer._id).toString())) {
          project.attendants.push((volunteer._id).toString());
        }
        project.save();

        Organization.findById(project.creator_id, (err, organization) => {
          if (err) return callback("organization_not_found");

          let flag = 0;

          async.timesSeries(organization.volunteers.length, (i, next) => {

            if (organization.volunteers[i].toString() == volunteer._id.toString()) {
              flag = 1;
              next();
            } else {
              next();
            }
          }, (err, res) => {
            if (err) return callback("volunteer_push_failed");
            if (flag!=1) {
              organization.volunteers.push(volunteer._id);
              organization.save();
            }
          })

          flag = 0;

          async.timesSeries(volunteer.joined_organizations.length, (i, next) => {

            if (volunteer.joined_organizations[i].toString() == organization._id.toString()) {
              flag = 1;
              next();
            } else {
              next();
            }
          }, (err, res) => {
            if (err) return callback("volunteer_push_failed");
            if (flag!=1) {
              volunteer.joined_organizations.push(organization._id);
              volunteer.save();
            }
          })

        })
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

volunteerSchema.statics.confirmEmail = function (body, callback) {

  Volunteer.findById(body._id, (err, volunteer) => {
    if (err || !volunteer) return callback("verify_error");
    if (body.confirmation_code == volunteer.confirmation_code.toString()) {
      volunteer.isEmailConfirmed = true;
      volunteer.save();
      return callback(null, volunteer);
    } else return callback("verify_error");
  })

}

volunteerSchema.statics.updateConfirmationCode = function (body, callback) {
  Volunteer.findById(body._id, (err, volunteer) => {
    if (err, !volunteer) return callback("bad_request");
    volunteer.confirmation_code = createConfirmationCode();
    volunteer.save();
    sendConfirmationEmail(volunteer);
    return callback(null, volunteer);
  })
}

volunteerSchema.statics.createStackedBarGraph = function (body, callback) {

  const xAxisLabels = [];
  const barStackLabels = [];
  const yAxisLabel = body.y_axis_filter

  Volunteer.find({}, (err, volunteersArray) => {
    if (err) return callback("fetch_failed");

    async.timesSeries(volunteersArray.length, (i, next) => {
      const volunteer = volunteersArray[i];
      let flag_x = 0;
      xAxisLabels.forEach((val) => {
        if (volunteer[body.x_axis_filter] == val) {
          flag_x = 1;
        }
      })

      if (!flag_x) {
        xAxisLabels.push(volunteer[body.x_axis_filter]);
      }

      let flag_y = 0;

      barStackLabels.forEach((val) => {
        if (volunteer[body.bar_stack_filter] == val) {
          flag_y = 1;
        }
      })

      if (!flag_y) {
        barStackLabels.push(volunteer[body.bar_stack_filter]);
        return next();
      }
      return next();

    }, (err) => {
      if (err) return callback("fetch_failed");
    });
    
    const xAxisFilter = body.x_axis_filter;
    const barStackFilters = body.bar_stack_filter

    const xAxisDocumentCountArray = [];
    const barStackDocumentCountArray = [];

    async.timesSeries(xAxisLabels.length, (j, next) => {

      Volunteer.find({
        [xAxisFilter]: xAxisLabels[j],
        joined_organizations: body._id.toString()
      }).countDocuments()
      .then(number => {
        try {
          xAxisDocumentCountArray.push(number);
          barStackDocumentCountArray.push([]);
        } catch (err) {
          return callback("fetch_failed");
        }
      })

      async.timesSeries(barStackLabels.length, (k, next) => {
        Volunteer.find({
          [xAxisFilter]: xAxisLabels[j],
          [barStackFilters]: barStackLabels[k],
          joined_organizations: body._id.toString()
        }).countDocuments()
        .then(numberAssociatedwithBarStacks => {
          try {
            barStackDocumentCountArray[j].push(numberAssociatedwithBarStacks);
          } catch (error) {
            return callback("fetch_failed");
          }
          next();
        })

      }, (err) => {
        if (err) return callback("fetch_failed");
        next();
      })

    }, (err) => {
      if (err) return callback("fetch_failed");
      return callback(null, {
        xAxisLabels,
        barStackLabels,
        yAxisLabel,
        xAxisDocumentCountArray,
        barStackDocumentCountArray
      })
    })
  });
}

volunteerSchema.statics.removeVolunteerFromOrganization = function (body, callback) {

  Organization.findById(body.organization_id, (err, organization) => {

    if (err) return callback("organization_not_found");

    if (organization) {
    
      Volunteer.findById(body.volunteer_id, (err, volunteer) => {
        
        if (err) return callback("volunteer_not_found");

        async.timesSeries(organization.projects_created.length, (i, next) => {

          const project_id = organization.projects_created[i].toString();
          const volunteer_id = body.volunteer_id;
  
          if (volunteer.projects.includes(project_id.toString())) {
            Volunteer.exitProject({
              project_id: project_id, 
              volunteer_id: volunteer_id
            }, (err, project) => {
              if (err) return callback("exit_project_failed");
              if (project) return next();
            })
          } else {
            next();
          }
        }, (err, res) => {
          if (err) return callback("iterator_failed");
  
          const newVolunteersArray = organization.volunteers.filter((value) => {
            return value != body.volunteer_id
          })
    
          organization.volunteers = newVolunteersArray;
          organization.save();

          const newOrganizationsArray = volunteer.joined_organizations.filter((value) => {
            return value != body.organization_id
          })
    
          volunteer.joined_organizations = newOrganizationsArray;
          volunteer.save();

          return callback(null, volunteer);
        })
      })
    }
  })
}

volunteerSchema.pre('save', hashpassword);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
