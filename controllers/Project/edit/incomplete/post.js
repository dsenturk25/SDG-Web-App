
const Project = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const async = require("async");

module.exports = (req, res) => {

  Project.findByIdAndUpdate(req.body.id, { isCompleted: false }, (err, project) => {
    if (err) return res.redirect("/");
    return res.send(project);
  })
}
