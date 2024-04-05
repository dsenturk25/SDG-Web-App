
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  
  Volunteer.findByIdAndUpdate(req.session.volunteer._id, { isConditionsSigned: true }, (err, volunteer) => {
    if (err) return res.json({ success: false, err: err });
    return res.json({ success: true, volunteer: volunteer });
  })
}
