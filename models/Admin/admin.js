
const mongoose = require("mongoose");
const verifypassword = require("../../utils/verifyPassword");
const hashpassword = require("../../utils/hashPassword");
const Sdg = require("../SDGs/sdg");
const Organization = require("../Organizations/organization");
const Volunteer = require("../Volunteer/volunteer");
const Project = require("../Projects/project");
const async = require("async")

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
    trim: true,
    required: true
  },

  admin_type: {
    type: String,
    enum: ["teacher", "student"],
    required: true
  }

})

adminSchema.statics.createAdmin = function (body, callback) {

  if (body.root_admin_password == process.env.ROOT_ADMIN_PASSWORD) {
    Admin.findOne({ email: body.email }).then(admin => {
      if (admin) return callback("email_not_unique", null);
    });

    delete body.root_admin_password;

    const newAdmin = new Admin(body);
    if (newAdmin) {
      newAdmin.save();

      return callback(null, newAdmin);
    }
    return callback("bad_request");
  } else {
    callback("root_admin_password_doesn't_match")
  }
}

adminSchema.statics.loginAdmin = function (body, callback) {

  Admin.findOne({ email: body.email }, (err, admin) => {
    if (err || !admin) return callback("user_not_found");

    verifypassword(body.password, admin.password, (res) => {
      if (res) return callback(null, admin);
      return callback("verify_error", null);
    })
  });
}

adminSchema.statics.findAdminById = function (body, callback) {
  Admin.findById(body._id, (err, admin) => {
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

  Organization.findByIdAndUpdate(body._id, { isOnWaitList: false }, (err, organization) => {
    if (err) return callback("update_failure");
    return callback(null, organization);
  })
}

adminSchema.statics.deleteOrganization = function (body, callback) {

  Organization.findByIdAndDelete(body._id, (err, organization) => {
    if (err) return callback("delete_failed");

    if (organization.projects_created[0] == null) return callback(null, organization);

    for (let i = 0; i < organization.projects_created.length; i++) {
      const project_id = organization.projects_created[i];
      Project.findByIdAndDelete(project_id, (err, project) => {
        if (err) return callback("delete_failed");

        async.timesSeries(project.attendants.length, (j, next) => {

          const volunteer_id = project.attendants[j];

          Volunteer.findById(volunteer_id, (err, volunteer) => {
            if (err) return callback("delete_failed");

            const newArray = volunteer.projects.filter((id) => {
              return id != `${project._id}`;
            })
            volunteer.projects = newArray;
            volunteer.save();
            next();
          })
        }, (err) => {
          if (err) return callback("delete_failed");
          return callback(null, organization);
        })
      })
    }
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

    async.timesSeries(volunteer.projects.length, (i, next) => {
      const project_id = volunteer.projects[i];
      Project.findById(project_id, (err, project) => {
        if (err) return callback("delete_failed");

        const newAttendantArray = project.attendants.filter((id) => {
          return id != `${volunteer._id}`;
        })

        project.attendants = newAttendantArray;
        project.save();
        next();
      })
    }, (err, project) => {
      if (err) return callback("delete_failed");
      callback(null, volunteer);
    })
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

adminSchema.statics.fetchVolunteersByFilter = function (body, callback) {

  Volunteer.find({}, (err, volunteersArray) => {
    if (err) return callback("fetch_failed");

    const resArray = [];

    async.timesSeries(volunteersArray.length, (i, next) => {
      const volunteer = volunteersArray[i];

      if (body.input == "") {
        resArray.push(volunteer);
        next();
      }

      else if (body.filter == "nameSurname") {

        const nameSurname = (volunteer.name + " " + volunteer.surname).toLowerCase();

        if (nameSurname.includes((body.input.toString()).toLowerCase())) {
          resArray.push(volunteer);
        }
        next();
      } else if (body.filter == "gender") {

        if (body.input == volunteer.gender) {
          resArray.push(volunteer);
        }
        next();
      } else if (body.filter == "school") {

        if (volunteer.school.toLowerCase().includes(body.input.toLowerCase())) {
          resArray.push(volunteer)
        }
        next();
      } else if (body.filter == "country") {

        if (volunteer.country.toLowerCase().includes(body.input.toLowerCase())) {
          resArray.push(volunteer);
        }
        next();
      } else if (body.filter == "city") {
        if (volunteer.city.toLowerCase().includes(body.input.toLowerCase())) {
          resArray.push(volunteer);
        }
        next();
      }
    }, (err, res) => {
      if (err) return callback("fetch_failed");
      return callback(null, resArray);

    })
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

adminSchema.statics.createStackedBarGraph = function (body, callback) {

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
        [xAxisFilter]: xAxisLabels[j]
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
          [barStackFilters]: barStackLabels[k]
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

adminSchema.pre("save", hashpassword);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
