
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.createVolunteer(req.body, (err, volunteer) => {
    if (err) return res.status(400).send();
    res.status(201).send({volunteer});
  });
}
