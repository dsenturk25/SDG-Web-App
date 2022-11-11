
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.deleteOrganization(req.body, (err, organization) => {
    if (err) return res.send(err);
    return res.send(organization);
  })
}
