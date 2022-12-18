
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (!volunteer.isEmailConfirmed) return res.redirect("/volunteer/email_confirm");
    else if (volunteer.isEmailConfirmed) return next();
  })
}
