
const Admin = require("../../../../models/Admin/admin");
const Organization = require("../../../../models/Organizations/organization");
const Project = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const Sdg = require("../../../../models/SDGs/sdg");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../../utils/uploadImageToAws");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    Organization.find({}, (err, organizations) => {

      if (err) return res.redirect("/admin");

      Project.find({}, (err, projects) => {
        if (err) return res.redirect("/admin");

        Volunteer.find({}, (err, volunteers) => {

          if (err) return res.redirect("/admin");

          Sdg.find({}, (err, sdgs) => {
            if (err) return res.redirect("/admin");

            async.timesSeries(sdgs.length, async (i, next) => {
              const sdg = sdgs[i];

              if (sdg.imageName && sdg.imageName.length > 0) {
                sdg.image = await retrieveImageFromImageName(sdg.imageName);
              } else {
                sdg.image = Buffer.from(sdg.image).toString('base64');
              }
            }, (err) => {
              res.render("admin/organization", {
                page: "admin/organization",
                title: "Admin Organizations",
                includes: {
                  external: {
                    css: ["page", "general"],
                    js: ["page", "functions"]
                  }
                }, 
                admin,
                organizations,
                projects,
                volunteers,
                sdgs
              })
            })
          })
        })
      })
    })
  })
}

