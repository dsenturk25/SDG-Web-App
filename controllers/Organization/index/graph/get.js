
const Project = require("../../../../models/Projects/project");
const Sdg = require("../../../../models/SDGs/sdg");
const { retrieveImageFromImageName } = require("../../../../utils/uploadImageToAws");
const async = require("async");

module.exports = (req, res) => {

  const organization = req.session.organization;

  Project.find({creator_id: req.session.organization._id}, (err, projects) => {

    if (err) return res.redirect("/");

    async.timesSeries(projects.length, async (i, next) => {
      const project = projects[i];
      if (project) {
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

        async.timesSeries(sdgs.length, async (i, next) => {
          const sdg = sdgs[i];

          if (sdg) {
            if (sdg.imageName && sdg.imageName.length) {
              sdg.image = await retrieveImageFromImageName(sdg.imageName);
            } else {
              sdg.image = Buffer.from(sdg.image).toString('base64');
            }
          }
        }, (err) => {
          if (err) return res.redirect("/");
          res.render("organization/graph", {
            page: "organization/graph",
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
}
