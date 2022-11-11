
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.deleteVolunteer(req.body, (err, volunteer) => {
    if (err) return res.send(err);
    return res.send(volunteer);
  })
}
