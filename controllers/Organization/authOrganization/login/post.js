
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req, res) => {
  Organization.loginOrganization(req.body, (err, organization) => {
    if (err) return res.status(400).send("verify_error");
    req.session.organization = organization; // Authentication w/ cookie
    return res.status(200).send(organization);
  })
}
