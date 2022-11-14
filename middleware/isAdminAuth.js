
const Admin = require("../models/Admin/admin");

module.exports = (req, res, next) => {

  if (req.session && req.session.admin) {
    Admin.findAdminById(req.session.admin, (err, admin) => {
      if (err || !admin) return res.status(401).send(err);
      else if (admin) next();
    })
  } else {
    return res.redirect("/admin/login");
  }
}
