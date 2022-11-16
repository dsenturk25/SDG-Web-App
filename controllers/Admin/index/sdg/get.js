

const Admin = require("../../../../models/Admin/admin");
const Sdg = require("../../../../models/SDGs/sdg")

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    Sdg.find({}, (err, sdgs) => {
      if (err) {
        return res.redirect("/admin/login");
      }

      for (let i = 0; i < sdgs.length; i++) {
        const sdg = sdgs[i];
        sdg.image = Buffer.from(sdg.image).toString('base64');
      }

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
}

