
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  if (req.session.volunteer) {
    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (!volunteer.isEmailConfirmed) return res.send({success: false, err: "email_not_confirmed"});
      else if (!volunteer.isAccountCompleted) return res.send({success: false, err: "account_incomplete"});

      Volunteer.joinProject(req.body, (err, volunteer) => {
        if (err) return res.redirect();
        return res.send(volunteer);
      })
    })
  } else {
    return res.redirect("/login");
  }
}

