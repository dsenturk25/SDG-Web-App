
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req, res) => {
  Organization.findOrganizationById(req.session.organization, (err, organization) => {
    if (err) return res.status(404).send(err);
    return res.status(200).send(organization);
  })
}
