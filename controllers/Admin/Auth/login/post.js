
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.loginAdmin(req.body, (err, admin) => {
    if (err) return res.status(400).send("verify_error");
    req.session.admin = admin; // Authentication w/ cookie
    return res.status(200).send(admin);
  })
}
