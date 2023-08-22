
const Organization = require("../../../models/Organizations/organization");
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  const organizationId = req.query.id;

  Organization.findById(organizationId, (err, organization) => {
    if (err) return res.send("bad_request");
    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (err) return res.send("bad_request");

      res.render("index/organization", {
        page: "index/organization",
        title: organization.name,
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        organization,
        volunteer
      })
    })
  })
}
