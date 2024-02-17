
const Projects = require("../../../models/Projects/project");
const Organization = require("../../../models/Organizations/organization");
const Sdg = require("../../../models/SDGs/sdg");
const Volunteer = require("../../../models/Volunteer/volunteer");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  Projects.findById(req.query._id, (err, project) => {
    if (err) return res.send("error");

    Organization.findById(project.creator_id, async (err, organization) => {
      if (err) return res.send("error");

      if (project.imageName && project.imageName.length > 0) {
        project.photo = await retrieveImageFromImageName(project.imageName);

      } else {
        project.photo = Buffer.from(project.photo).toString('base64');
      }

      organization.photo ? organization.photo = Buffer.from(organization.photo).toString('base64') : organization.photo = "";

      Sdg.find({}, (err, sdgs) => {

        if (err) return res.send("error");


        async.timesSeries(sdgs.length, async (i, next) => {
          const sdg = sdgs[i];

          if (sdg.imageName && sdg.imageName.length > 0) {
            sdg.image = await retrieveImageFromImageName(sdg.imageName);
          } else {
            sdg.image = Buffer.from(sdg.image).toString('base64');
          }
        }, (err) => {
          
          if (err) return res.send("error");

        if (req.session.volunteer && req.session.volunteer._id) {
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
          } else {
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
              sdgs
            })
          }
        })
      })
    })
  })
}
