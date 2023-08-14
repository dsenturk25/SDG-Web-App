
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.markVolunteerPresent(req.body, (err, volunteer) => {
    if (err) return res.redirect("/");
    return res.send(volunteer);
  })
}
