
const Admin = require("../../../../models/Admin/admin");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

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
      admin
    })
  })
}

