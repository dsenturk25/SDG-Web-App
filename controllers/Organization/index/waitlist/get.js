
const Organization = require("../../../../models/Organizations/organization");

module.exports = (req, res) => {

  Organization.findById(req.session.organization._id, (err, organization) => {
    if (err || !organization) return res.redirect("/organization");
    
    if (organization.isOnWaitList) {
      return res.render("organization/waitlist", {
        page: "organization/waitlist",
        title: "Organization Waitlist",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        }, 
      })
    } 
    return res.redirect("/organization");
  })
}
