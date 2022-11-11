
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.fetchOrganizations(req.body, (err, organizationsArray) => {
    if (err) return res.send(err);
    return res.send(organizationsArray);
  })
}
