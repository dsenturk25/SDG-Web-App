
const Volunteer = require("../models/Volunteer/volunteer");

module.exports = (req, res, next) => {

  if (req.session && req.session.volunteer) {
    Volunteer.findVolunteerById(req.session.volunteer, (err, volunteer) => {
      if (err) return res.status(404).send("User not found");
      req.session.volunteer = volunteer;
      next();
    })
  } else {
    res.status(401).send("Authentication error");
  }
}

