
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  if (req.session.volunteer) {
    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (!volunteer.isAccountCompleted) return res.redirect("/volunteer/complete_account");
      else if (volunteer.isAccountCompleted) return next();
    })
  } else {
    return res.redirect("/volunteer/complete_account");
  }
}
