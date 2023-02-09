
const Projects = require("../../../models/Projects/project");

module.exports = (req, res) => {

  Projects.find({}, (err, projects) => {
    if (err) return res.send("error");

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      project.photo = Buffer.from(project.photo).toString('base64');
    }

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
    })
  })
}
