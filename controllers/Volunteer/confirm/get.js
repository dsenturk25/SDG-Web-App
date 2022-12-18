
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (volunteer.isEmailConfirmed) return res.redirect("/volunteer");
    return res.render("volunteer/confirm", {
      page: "volunteer/confirm",
      title: "Confirm your email",
      includes: {
        external: {
          css: ["page", "general"],
          js: ["page", "functions"]
        }
      }, 
    })
  })
}

