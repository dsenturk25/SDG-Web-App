

const Admin = require("../../../../models/Admin/admin");
const Sdg = require("../../../../models/SDGs/sdg");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../../utils/uploadImageToAws");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    Sdg.find({}, (err, sdgs) => {
      if (err) {
        return res.redirect("/admin/login");
      }

      async.timesSeries(sdgs.length, async (i, next) => {
        const sdg = sdgs[i];
        if (sdg.image && (!sdg.imageName || sdg.imageName.length <= 0)) {
          sdg.image = Buffer.from(sdg.image).toString('base64');
        } else if (sdg.imageName && sdg.imageName.length > 0) {
          sdg.image = await retrieveImageFromImageName(sdg.imageName);
        }        
      }, (err) => {
        if (err) return res.redirect("/admin/login");
        res.render("admin/sdg", {
          page: "admin/sdg",
          title: "Admin SDGs",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          }, 
          admin,
          sdgs
        })
      })
    })
  })
}

