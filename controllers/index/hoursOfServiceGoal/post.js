
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.findByIdAndUpdate(req.session.volunteer._id, { hoursOfServiceGoal: req.body.hoursOfServiceGoal }, (err, volunteer) => {
    if (err) return res.redirect("/");
    return res.send(volunteer);
  })
}
