
const Admin = require("../../../../models/Admin/admin");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    res.render("admin/project", {
      page: "admin/project",
      title: "Admin Projects",
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

