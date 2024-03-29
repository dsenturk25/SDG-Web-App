
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  if (req.session && req.session.volunteer && req.session.volunteer != {}) {
    Volunteer.findVolunteerById(req.session.volunteer, (err, volunteer) => {
      if (err || !volunteer) return res.redirect("/login");
      else if (volunteer) next();
    })
  } else {
    return res.redirect("/login");
  }
}

