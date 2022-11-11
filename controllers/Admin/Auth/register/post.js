
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.createAdmin(req.body, (err, admin) => {
    if (err) return res.status(400).send();
    req.session.admin = admin; // Authentication w/ cookie
    res.status(201).send(admin);
  });
}
