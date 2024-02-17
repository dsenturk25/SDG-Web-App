
const Admin = require("../../../../models/Admin/admin");
const Learn = require("../../../../models/Learn/learn");
const Activist = require("../../../../models/Activist/activist");

module.exports = (req, res) => {

  Admin.findAdminById(req.session.admin, (err, admin) => {
    if (err) return res.redirect("/admin/login");
    Learn.find({}, (err, learnArray) => {
      if (err) return res.redirect("/admin/login");

      Activist.find({}, (err, activists) => {
        if (err) return res.redirect("/admin/login");

        res.render("admin/learn", {
          page: "admin/learn",
          title: "Admin Learn",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          admin,
          learnArray,
          activists
        })
      })
    })
  })
}


