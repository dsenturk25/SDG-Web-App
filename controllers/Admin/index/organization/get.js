
const Admin = require("../../../../models/Admin/admin");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    res.render("admin/organization", {
      page: "admin/organization",
      title: "Admin Organizations",
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

