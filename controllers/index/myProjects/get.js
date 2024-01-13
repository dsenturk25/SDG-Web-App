
const Volunteer = require("../../../models/Volunteer/volunteer");
const Project = require("../../../models/Projects/project");
const async = require("async");

module.exports = (req, res) => {

  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (err) return res.send("error");

    let projectsArray = [];

    async.timesSeries(volunteer.projects.length, (i, next) => {
      const projectId = volunteer.projects[i];
      Project.findById(projectId, (err, project) => {
        if (err) return res.send("error");
        if (project.photo) {
          project.photo = Buffer.from(project.photo).toString('base64');
        }
        projectsArray.push(project);
        next();
      })
    }, (err) => {
      if (err) return res.send("error");

      return res.render("index/myProjects", {
        page: "index/myProjects",
        title: "My Projects",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        projectsArray,
        volunteer
      })
    })
  })
}
