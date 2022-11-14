
const Admin = require("../../../../models/Admin/admin");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    res.render("admin/volunteer", {
      page: "admin/volunteer",
      title: "Admin Volunteers",
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

