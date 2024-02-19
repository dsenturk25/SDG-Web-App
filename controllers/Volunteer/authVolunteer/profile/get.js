
const Projects = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const Sdgs = require("../../../../models/SDGs/sdg");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../../utils/uploadImageToAws");

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

      if (req.session.volunteer) {
        Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
          if (err) return res.redirect("/login");

          Sdgs.find({}, (err, sdgs) => {
            if (err) return res.redirect("/login");

            async.timesSeries(sdgs.length, async (i, next) => {
              if (err) return res.redirect("/login");

              const sdg = sdgs[i];
              
              if (sdg.imageName && sdg.imageName.length > 0) {
                sdg.image = await retrieveImageFromImageName(sdg.imageName);
              } else {
                sdg.image = Buffer.from(sdg.image).toString('base64');
              }
            }, (err) => {
              if (err) return res.redirect("/login");

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
        })
      }
    })
  })
}
