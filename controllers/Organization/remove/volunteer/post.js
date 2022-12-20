
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.removeVolunteerFromOrganization(req.body, (err, organization) => {
    if (err) return res.redirect("/organization");
    return res.redirect("/organization/volunteers");
  })
}

