
const Project = require("../../../models/Projects/project");
const Volunteer = require("../../../models/Volunteer/volunteer");
const async = require("async");

module.exports = (req, res) => {
  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    return res.render("index/calendar", {
      page: "index/calendar",
      title: "Calendar",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      },
      volunteer
    })
  })
}

