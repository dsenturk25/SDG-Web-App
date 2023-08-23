
const Organization = require("../../../models/Organizations/organization");
const Volunteer = require("../../../models/Volunteer/volunteer");
const Projects = require("../../../models/Projects/project");
const Sdg = require("../../../models/SDGs/sdg");

module.exports = (req, res) => {

  const organizationId = req.query.id;

  Organization.findById(organizationId, (err, organization) => {
    if (err) return res.send("bad_request");

    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (err) return res.send("bad_request");

      Projects.find({}, (err, projects) => {
        if (err) return res.send("bad_request");

        Sdg.find({}, (err, sdgs) => {
          if (err) return res.send("bad_request");

          for (let i = 0; i < sdgs.length; i++) {
            const sdg = sdgs[i];
            sdg.image = Buffer.from(sdg.image).toString('base64');
          }


          for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            project.photo = Buffer.from(project.photo).toString('base64');
          }

          organization.photo = Buffer.from(organization.photo).toString('base64');

          res.render("index/organization", {
            page: "index/organization",
            title: organization.name,
            includes: {
              external: {
                css: ["page", "general"],
                js: ["page", "functions"]
              }
            },
            organization,
            volunteer,
            projects,
            sdgs
          })
        })
      })
    })
  })
}
