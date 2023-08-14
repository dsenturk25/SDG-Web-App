
const Projects = require("../../../models/Projects/project");
const Volunteer = require("../../../models/Volunteer/volunteer");
const Sdgs = require("../../../models/SDGs/sdg");
const Organization = require("../../../models/Organizations/organization");

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

          Organization.find({}, (err, organizations) => {
            if (err) return res.redirect("/login")

            for (let i = 0; i < organizations.length; i++) {
              const organization = organizations[i];
              organization.photo = Buffer.from(organization.photo).toString('base64');
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
              volunteer,
              sdgs,
              organizations
            })
          })
        })
      })
    }
  })
}
