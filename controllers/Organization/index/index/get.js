
const Organization = require("../../../../models/Organizations/organization");
const Project = require("../../../../models/Projects/project");
const Sdg = require("../../../../models/SDGs/sdg");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const async = require("async");
const {retrieveImageFromImageName} = require("../../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  Organization.findById(req.session.organization._id, (err, organization) => {

    if (err) return res.redirect("/");
    
    Project.find({ creator_id: req.session.organization._id }, (err, projects) => {

      async.timesSeries(projects.length, async (i, next) => {
        const project = projects[i];
        if (project.photo && project.photo.length > 10) {
          project.photo = Buffer.from(project.photo).toString('base64');
        } else if (project.imageName && project.imageName.length > 0) {
          project.photo = await retrieveImageFromImageName(project.imageName);
        }
      }, (err) => {
        if (err) return res.redirect("/");

        Sdg.find({}, (err, sdgs) => {

          if (err) return res.redirect("/");
  
          for (let i = 0; i < sdgs.length; i++) {
            const sdg = sdgs[i];
            sdg.image = Buffer.from(sdg.image).toString('base64');
          }
  
          Volunteer.find({}, (err, volunteers) => {
            if (err) return res.redirect("/");
  
            res.render("organization/index", {
              page: "organization/index",
              title: `${req.session.organization.name}`,
              includes: {
                external: {
                  css: ["page", "general"],
                  js: ["page", "functions"]
                }
              },
              organization,
              projects,
              sdgs,
              volunteers
            })
          })
        })
      })
    })
  })
}
