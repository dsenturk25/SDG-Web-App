
const Organization = require("../models/Organizations/organization");

module.exports = (req, res, next) => {
  
  if (req.session && req.session.organization) {
    Organization.findOrganizationById(req.session.organization, (err, organization) => {
      if (err || !organization) return res.status(401).send(err);
      else if (organization) next();
    })
  } else {
    return res.redirect("/organization/login");
  }
}
