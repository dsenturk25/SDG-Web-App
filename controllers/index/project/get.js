
const Projects = require("../../../models/Projects/project");
const Organization = require("../../../models/Organizations/organization");
const Sdg = require("../../../models/SDGs/sdg");
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Projects.findById(req.query._id, (err, project) => {
    if (err) return res.send("error");

    Organization.findById(project.creator_id, (err, organization) => {
      if (err) return res.send("error");

      project.photo = Buffer.from(project.photo).toString('base64');
      organization.photo ? organization.photo = Buffer.from(organization.photo).toString('base64') : organization.photo = "";

      Sdg.find({}, (err, sdgs) => {

        if (err) return res.send("error");

        for (let i = 0; i < sdgs.length; i++) {
          const sdg = sdgs[i];
          sdg.image = Buffer.from(sdg.image).toString('base64');
        }

        Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
          if (err) return res.send("error");

          res.render("index/project", {
            page: "index/project",
            title: "Volunteer",
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            project,
            organization,
            sdgs,
            volunteer
          })
        })
      })
    })
  })
}
