
const Volunteer = require("../../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  req.body._id = req.session.volunteer._id;

  Volunteer.updateConfirmationCode(req.body, (err, volunteer) => {
    if (err) return res.send({error: true, success: false});
    return res.send({error: false, success:true});
  })
}
