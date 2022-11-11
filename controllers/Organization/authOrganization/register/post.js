
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req, res) => {
  Organization.createOrganization(req.body, (err, organization) => {
    if (err) return res.status(400).send();
    req.session.organization = organization; // Authentication w/ cookie
    return res.status(201).send(organization);
  });
}
