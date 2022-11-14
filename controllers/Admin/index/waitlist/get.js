
const Admin = require("../../../../models/Admin/admin");
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req,res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {

    if (err) return res.redirect("/admin/login");

    Organization.find({isOnWaitList: true}, (err, organizations) => {

      if (err) return res.redirect("/admin");

      res.render("admin/waitlist", {
        page: "admin/waitlist",
        title: "Admin Waitlist",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        }, 
        admin,
        organizations
      })
    })
  })
}

