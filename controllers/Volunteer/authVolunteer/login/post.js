
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  
  Volunteer.loginVolunteer(req.body, (err, volunteer) => {
    if (err) return res.status(400).send("verify_error");
    req.session.volunteer = volunteer; // Authentication w/ cookie
    return res.status(200).send(volunteer);
  })
}
