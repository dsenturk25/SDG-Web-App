
const Organization = require("../models/Organizations/organization");

module.exports = (req, res, next) => {

  Organization.findById(req.session.organization._id, (err, organization) => {
    if (!organization.isAccountCompleted) return res.redirect("/organization/complete_account");
    else if (organization.isAccountCompleted) return next();
  })
}
