
const Projects = require("../../../models/Projects/project");
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Projects.find({}, (err, projects) => {
    if (err) return res.send("error");

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      project.photo = Buffer.from(project.photo).toString('base64');
    }

    if (req.session.volunteer) {
      Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
        if (err) return res.redirect("/login");

        res.render("index/index", {
          page: "index/index",
          title: "Volunteer",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          projects,
          volunteer
        })
      })
    }
  })
}
