
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  const args = {
    name: req.body.name,
    surname: req.body.surname,
    birth_date: req.body.birth_date,
    school: req.body.school,
    school_number: req.body.school_number,
    city: req.body.city,
    country: req.body.country,
    bio: req.body.bio,
    gender: req.body.gender,
    phone_number: req.body.phone_number,
    isAccountCompleted: true
  }
  Volunteer.findByIdAndUpdate(req.session.volunteer._id, args, (err, updatedVolunteer) => {
    if (err) return res.status(400).send("bad_request");
    return res.redirect("/")
  })
}
