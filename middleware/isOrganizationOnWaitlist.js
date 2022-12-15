
const Organization = require("../models/Organizations/organization");

module.exports = (req, res, next) => {

  Organization.findById(req.session.organization._id, (err, organization) => {

    if (err || !organization) return res.redirect("/organization/login");
    if (organization.isOnWaitList) return res.redirect("/organization/waitlist");
    else return next();
  })

}

