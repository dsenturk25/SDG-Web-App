
const Organization = require("../../../models/Organizations/organization");
const Volunteer = require("../../../models/Volunteer/volunteer");
const Projects = require("../../../models/Projects/project");
const Sdg = require("../../../models/SDGs/sdg");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  const organizationId = req.query.id;

  Organization.findById(organizationId, (err, organization) => {
    if (err) return res.send("bad_request");

      Projects.find({}, (err, projects) => {
        if (err) return res.send("bad_request");

        Sdg.find({}, async (err, sdgs) => {
          if (err) return res.send("bad_request");

          if (organization.imageName && organization.imageName.length > 0) {
            organization.photo = await retrieveImageFromImageName(organization.imageName);
          } else {
            organization.photo = Buffer.from(organization.photo).toString('base64');
          }
          
          async.timesSeries(sdgs.length, async (i, next) => {
            const sdg = sdgs[i];
            
            if (sdg.imageName && sdg.imageName.length > 0) {
              sdg.image = await retrieveImageFromImageName(sdg.imageName);
            } else {
              sdg.image = Buffer.from(sdg.image).toString('base64');
            }
          }, (err) => {
            if (err) return res.send("bad_request");

            async.timesSeries(projects.length, async (i, next) => {
              const project = projects[i];

              if (project.imageName && project.imageName.length > 0) {
                project.photo = await retrieveImageFromImageName(project.imageName);
              } else {
                project.photo = Buffer.from(project.photo).toString('base64');
              }
            }, (err) => {
              if (err) return res.send("bad_request");
  
              if (req.session.volunteer && req.session.volunteer._id) {
                
                Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
                  if (err) return res.send("bad_request");
  
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
                    projects,
                    sdgs,
                    volunteer
                  })
                })
              } else {
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
                  projects,
                  sdgs
                })
              }
            })
          })
        })
      })
  })
}
