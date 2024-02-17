
const Organization = require("../../../../models/Organizations/organization");
const Project = require("../../../../models/Projects/project");
const Sdg = require("../../../../models/SDGs/sdg");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  Project.find({ creator_id: req.session.organization._id }, (err, projects) => {

    if (err) return res.redirect("/");

    async.timesSeries(projects.length, async (i, next) => {
      const project = projects[i];
      if (project && project.name) {
        if (project.imageName && project.imageName.length > 0) {
          project.photo = await retrieveImageFromImageName(project.imageName);
        } else {
          project.photo = Buffer.from(project.photo).toString('base64');
        }
      }
    }, (err) => {
      if (err) return res.redirect("/");
      
      Sdg.find({}, (err, sdgs) => {

        if (err) return res.redirect("/");

        async.timesSeries(sdgs.length, async (j, next) => {
          const sdg = sdgs[j];
          if (sdg) {
            if (sdg.imageName && sdg.imageName.length > 0) {
              sdg.image = await retrieveImageFromImageName(sdg.imageName);
            } else {
              sdg.image = Buffer.from(sdg.image).toString('base64');
            }
          }
        }, (err) => {

          if (err) return res.redirect("/");

          Organization.findById(req.session.organization._id, async (err, organization) => {
 
            if (organization.imageName && organization.imageName.length > 0) {
              organization.photo = await retrieveImageFromImageName(organization.imageName);
            } else {
              organization.photo = Buffer.from(organization.photo).toString('base64');
            }
  
            res.render("organization/profile", {
              page: "organization/profile",
              title: `${req.session.organization.name}`,
              includes: {
                external: {
                  css: ["page", "general", "index"],
                  js: ["page", "functions"]
                }
              },
              organization,
              projects,
              sdgs
            })
          })
        })
      })
    })
  })
}
