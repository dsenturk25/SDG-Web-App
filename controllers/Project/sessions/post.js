
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Volunteer.addSessionManual(req.body, (err, project) => {
    if (err) return res.redirect("/organization");

    return res.redirect("/organization");
  })

}

