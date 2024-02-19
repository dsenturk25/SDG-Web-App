
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  if (req.session.volunteer) {
    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (!volunteer.isEmailConfirmed) {
        res.send({success: false, err: "email_not_confirmed"});
        return res.redirect("/volunteer/email_confirm");
      }
      else if (volunteer.isEmailConfirmed) return next();
    })
  } else {
    return res.redirect("/login");
  }
}
