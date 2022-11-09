
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.findVolunteerById(req.session.volunteer, (err, volunteer) => {
    if (err) return res.status(404).send(err);
    return res.status(200).send(volunteer);
  })
}
