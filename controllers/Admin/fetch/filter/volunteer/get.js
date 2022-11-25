
const Admin = require("../../../../../models/Admin/admin");

module.exports = (req, res) => {

  Admin.fetchVolunteersByFilter(req.body, (err, volunteers) => {
    if (err) return res.redirect("/admin/login");
    return res.send(volunteers);
  })

}
