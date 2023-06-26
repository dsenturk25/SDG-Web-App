
const Project = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const async = require("async");

module.exports = (req, res) => {

  let totalHoursOfService = 0;

  Project.findByIdAndUpdate(req.body.id, { isCompleted: true }, (err, project) => {
    if (err) return res.redirect("/");
    async.timesSeries(project.sessions.length, (i, next) => {
      const session = project.sessions[i];
      const sessionDuration = Number(session.session_duration.split(":")[0] + "." + session.session_duration.split(":")[0]);
      totalHoursOfService += sessionDuration;
      next();
    }, (err) => {
      if (err) return callback(err);

      async.timesSeries(project.attendants.length, (j, next) => {
        const volunteerId = project.attendants[j];
        Volunteer.findById(volunteerId, (err, volunteer) => {
          if (err) return callback(err);
          volunteer.completedHoursOfService += totalHoursOfService;
          volunteer.save();
        })
        next();
      }, (err) => {
        if (err) return callback(err);
        return res.send(project);
      })
    })
  })
}
