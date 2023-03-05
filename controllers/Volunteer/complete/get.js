
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (volunteer.isAccountCompleted) return res.redirect("/");
    return res.render("volunteer/complete", {
      page: "volunteer/complete",
      title: "Complete Your Account",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      },
      volunteer
    })
  })
}

