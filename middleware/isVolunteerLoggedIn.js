
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  if (req.session && req.session.volunteer) {
    Volunteer.findVolunteerById(req.session.volunteer, (err, volunteer) => {
      if (err || !volunteer) return res.status(404).send(err);
      else if (volunteer) next();
    })
  } else {
    return res.redirect("/login");
  }
}

