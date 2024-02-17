
const Projects = require("../../../models/Projects/project");
const Volunteer = require("../../../models/Volunteer/volunteer");
const Sdgs = require("../../../models/SDGs/sdg");
const Organization = require("../../../models/Organizations/organization");
const async = require("async");
const { uploadImageToAws, retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  Projects.find({}, (err, projects) => {
    if (err) return res.send("error");

    async.timesSeries(projects.length, async (i, next) => {
      const project = projects[i];
      
      if (project.imageName && project.imageName.length > 0) {
        project.photo = await retrieveImageFromImageName(project.imageName);
      } else {
        project.photo = Buffer.from(project.photo).toString('base64');
      }
    }, (err) => {
      if (err) return res.send("error");


        Sdgs.find({}, (err, sdgs) => {
          if (err) return res.redirect("/login");

          async.timesSeries(sdgs.length, async (j, next1) => {
            const sdg = sdgs[j];
            if (sdg.imageName && sdg.imageName.length > 0) {
              sdg.image = await retrieveImageFromImageName(sdg.imageName);
            } else {
              sdg.image = Buffer.from(sdg.image).toString('base64');
            }
          }, (err) => {
            if (err) return res.redirect("/login");


          Organization.find({}, (err, organizations) => {
            if (err) return res.redirect("/login")
            for (let i = 0; i < organizations.length; i++) {
              const organization = organizations[i];
              organization.photo = Buffer.from(organization.photo).toString('base64');
            }
            if (req.session.volunteer && req.session.volunteer._id) {

              Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
                if (err) return res.redirect("/login");
              return res.render("index/index", {
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
          } else {
            return res.render("index/index", {
              page: "index/index",
              title: "Volunteer",
              includes: {
                external: {
                  css: ["page", "general"],
                  js: ["page", "functions"]
                }
              },
              projects,
              sdgs,
              organizations
            })
          }
        })
      })
      })
    })
  })
}
