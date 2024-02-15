
const mongoose = require("mongoose");
const hashpassword = require("../../utils/hashPassword");
const verifypassword = require("../../utils/verifyPassword");
const Project = require("../Projects/project");
const Organization = require("../Organizations/organization");
const { sendConfirmationEmail } = require("../../utils/sendEmail");
const createConfirmationCode = require("../../utils/createConfirmationCode");
const async = require("async");
const { addTimes, subtractTimes } = require("../../utils/timeOperations");
const Sdg = require("../SDGs/sdg");

const volunteerSchema = mongoose.Schema({

  name: {
    type: String,
    trim: true,
  },

  surname: {
    type: String,
    trim: true,
  },

  bio: {
    type: String,
    default: ""
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
    trim: true,
    default: ""
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  school: {
    type: String,
    trim: true,
    default: ""
  },

  projects: [
    project = {
      type: mongoose.Types.ObjectId
    }
  ],

  gender: {
    type: String,
    trim: true,
    enum: ["m", "f", "o"],
    default: "o"
  },

  birth_date: {
    type: String,
    default: ""
  },

  phone_number: {
    type: String,
    trim: true,
    default: ""
  },

  country: {
    type: String,
    trim: true,
    default: ""
  },

  city: {
    type: String,
    trim: true,
    default: ""
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
  ],

  totalHoursOfService: {
    type: String,
    default: "0:00"
  },

  hoursOfServiceGoal: {
    type: String,
    default: "0"
  },

  completedHoursOfService: {
    type: String,
    default: "0:00"
  },

  attendance: [
    each_attendance = {
      project_id: {
        type: mongoose.Types.ObjectId
      },
      sessions: {
        type: Array
      }
    }
  ],

  liked_organizations: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ],

  liked_projects: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ]
})

volunteerSchema.statics.addSessionManual = function (body, callback) {

  const session = {
    session_date: body.session_date,
    session_address: body.session_address,
    session_environment: body.session_environment,
    session_start_time: body.session_start_time,
    session_duration: body.session_duration,
    session_link_to_online_environment: body.session_link_to_online_environment,
    session_latitude: body.session_latitude,
    session_longitude: body.session_longitude,
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

      if (project.attendants) {
        async.timesSeries(project.attendants.length, (j, next1) => {
          const volunteerId = project.attendants[j];

          Volunteer.findById(volunteerId, (err, volunteer) => {
            if (err) return callback("create_failed");

            if (volunteer.attendance) {
              async.timesSeries(volunteer.attendance.length, (k, next2) => {
                const eachAttendanceObject = volunteer.attendance[k];

                if (eachAttendanceObject.project_id.toString() == project._id.toString()) {
                  eachAttendanceObject.sessions.push(false);
                  volunteer.save();
                  next2();
                } else {
                  next2();
                }
              }, (err) => {
                if (err) return callback("create_failed");
                next1();
              })
            }
          })
        }, (err) => {
          if (err) return callback("create_failed");
          project.save();
          return callback(null, project);
        })
      }
    })
  })
}

volunteerSchema.statics.createVolunteer = function (body, callback) {

  Volunteer.findOne({ email: body.email }).then(volunteer => {
    if (volunteer) return callback("email_not_unique", null);
    const newVolunteer = new Volunteer(body);

    if (newVolunteer) {
  
      newVolunteer.confirmation_code = createConfirmationCode();
  
      newVolunteer.save();
      sendConfirmationEmail(newVolunteer);
      return callback(null, newVolunteer);
    }
  
    return callback("bad_request");
  });
}

volunteerSchema.statics.loginVolunteer = function (body, callback) {

  Volunteer.findOne({ email: body.email }).then(volunteer => {
    if (!volunteer) return callback("user_not_found");

    verifypassword(body.password, volunteer.password, (res) => {
      if (res) return callback(null, volunteer);

      return callback("verify_error", null);
    })
  });
}

volunteerSchema.statics.findVolunteerById = function (body, callback) {

  Volunteer.findById(mongoose.Types.ObjectId(body._id), (err, volunteer) => {
    ;
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

      Project.findById(body.project_id, (err, project) => {
        if (err) return callback("project_not_found");

        if (!project.attendants.includes((volunteer._id).toString())) {
          project.attendants.push((volunteer._id).toString());
        }
        project.save();

        function createFalseArray(length) {
          return Array(length).fill(false);
        }

        // Example: Create an array containing 5 "false" values
        const attendance = createFalseArray(project.sessions.length);

        volunteer.attendance = {
          project_id: project._id,
          sessions: attendance
        }

        async.timesSeries(project.sessions.length, (i, next) => {
          const session = project.sessions[i];
          volunteer.totalHoursOfService = addTimes(volunteer.totalHoursOfService, session.session_duration);

          next();
        }, (err) => {
          if (err) return callback(err);
        })

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
            if (flag != 1) {
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
            if (flag != 1) {
              volunteer.joined_organizations.push(organization._id);
            }
            volunteer.save();
            return callback(null, project);
          })
        })
      })
    }
  });

}

volunteerSchema.statics.markVolunteerPresent = function (body, callback) {
  Volunteer.findById(body.volunteer_id, (err, volunteer) => {
    if (err) return callback("user_not_found");
    if (volunteer) {
      const projectId = body.projectId;
      const sessionIndex = body.sessionIndex;
      const sessionDuration = body.sessionDuration;

      for (let i = 0; i < volunteer.attendance.length; i++) {
        const projectAttendance = volunteer.attendance[i];
        if (projectAttendance.project_id == projectId) {

          if (projectAttendance.sessions[sessionIndex] == false) {
            projectAttendance.sessions[sessionIndex] = true;

            volunteer.completedHoursOfService = addTimes(volunteer.completedHoursOfService, sessionDuration);

            volunteer.save();
          }
          return callback(null, volunteer);
        }
      }
    }
  })
}

volunteerSchema.statics.markVolunteerAbsent = function (body, callback) {
  Volunteer.findById(body.volunteer_id, (err, volunteer) => {
    if (err) return callback("user_not_found");
    if (volunteer) {
      const projectId = body.projectId;
      const sessionIndex = body.sessionIndex;
      const sessionDuration = body.sessionDuration;

      for (let i = 0; i < volunteer.attendance.length; i++) {
        const projectAttendance = volunteer.attendance[i];
        if (projectAttendance.project_id == projectId) {
          if (projectAttendance.sessions[sessionIndex] == true) {
            projectAttendance.sessions[sessionIndex] = false;

            volunteer.completedHoursOfService = subtractTimes(volunteer.completedHoursOfService, sessionDuration);

            volunteer.save();
          }
          return callback(null, volunteer);
        }
      }
    }
  })
}

volunteerSchema.statics.exitProject = function (body, callback) {
  Volunteer.findById(body.volunteer_id, (err, volunteer) => {
    if (err) return callback("user_not_found");
    if (volunteer) {

      const newProjectsArray = volunteer.projects.filter((value) => {
        return value != body.project_id
      })

      volunteer.projects = newProjectsArray;

      Project.findById(body.project_id, (err, project) => {
        if (err) return callback("project_not_found");
        const newAttendantsArray = project.attendants.filter((value) => {
          return value != body.volunteer_id;
        })

        async.timesSeries(project.sessions.length, (i, next) => {
          const session = project.sessions[i];
          volunteer.totalHoursOfService = subtractTimes(volunteer.totalHoursOfService, session.session_duration);
          next();
        }, (err) => {
          if (err) return callback(err);
          volunteer.save();
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

          let newOrganizationsArray = []
          newOrganizationsArray = volunteer.joined_organizations.filter((value) => {
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


volunteerSchema.statics.getLeaderBoardDataOfUser = function (body, callback) {
  const city = body.city;
  const country = body.country;
  const school = body.school;


  const leaderboard = {};

  Volunteer.find({}, (err, allVolunteers) => {
    if (err) return callback(err);

    async.timesSeries(allVolunteers.length, (i, next) => {
      const eachVolunteer = allVolunteers[i];
      eachVolunteer.completedHoursOfService = parseInt(eachVolunteer.completedHoursOfService.split(":")[0] + eachVolunteer.completedHoursOfService.split(":")[1])
      next();
    }, (err) => {
      if (err) return callback(err);

      // Retrieve leaderboard based on city
      Volunteer.find({ city })
        .sort({ completedHoursOfService: -1 })
        .exec((err, volunteersByCity) => {
          if (err) {
            return callback(err);
          }

          leaderboard.city = volunteersByCity;
          // Retrieve leaderboard based on country
          Volunteer.find({ country })
            .sort({ completedHoursOfService: -1 })
            .exec((err, volunteersByCountry) => {
              if (err) {
                return callback(err);
              }

              leaderboard.country = volunteersByCountry;

              // Retrieve leaderboard based on school
              Volunteer.find({ school })
                .sort({ completedHoursOfService: -1 })
                .exec((err, volunteersBySchool) => {
                  if (err) {
                    return callback(err);
                  }

                  leaderboard.school = volunteersBySchool;

                  callback(null, leaderboard);
                });
            });
        })
    })
  });

}


volunteerSchema.pre('save', hashpassword);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
