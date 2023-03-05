
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req, res) => {

  Organization.findById(req.session.organization._id, (err, organization) => {
    if (organization.isAccountCompleted) return res.redirect("/");
    return res.render("organization/complete", {
      page: "organization/complete",
      title: "Complete Your Account",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      },
      organization
    })
  })
}

