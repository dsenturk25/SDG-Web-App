
const Projects = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const Sdgs = require("../../../../models/SDGs/sdg");

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

        Sdgs.find({}, (err, sdgs) => {
          if (err) return res.redirect("/login");

          for (let i = 0; i < sdgs.length; i++) {
            const sdg = sdgs[i];
            sdg.image = Buffer.from(sdg.image).toString('base64');
          }

          res.render("index/profile", {
            page: "index/profile",
            title: "Edit Profile",
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            projects,
            volunteer,
            sdgs
          })
        })
      })
    }
  })
}
