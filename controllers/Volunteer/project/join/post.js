
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  if (req.session.volunteer) {
    Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
      if (!volunteer.isEmailConfirmed) return res.redirect("/volunteer/email_confirm");
      else if (!volunteer.isAccountCompleted) return res.redirect("/volunteer/complete_account");

      Volunteer.joinProject(req.body, (err, volunteer) => {
        if (err) return res.redirect();
        return res.send(volunteer);
      })
    })
  } else {
    return res.redirect("/login");
  }
}

