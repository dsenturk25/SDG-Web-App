
const Admin = require("../../../../models/Admin/admin");
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    Volunteer.find({}, (err, volunteers) => {
      if (err) return res.redirect("/admin");

      res.render("admin/volunteer", {
        page: "admin/volunteer",
        title: "Admin Volunteers",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        }, 
        admin,
        volunteers
      })
    })
  })
}

