
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.exitProject(req.body, (err, volunteer) => {
    if (err) return res.send(err);
    return res.send(volunteer);
  })
}

