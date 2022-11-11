
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.fetchVolunteers(req.body, (err, volunteersArray) => {
    if (err) return res.send(err);
    return res.send(volunteersArray);
  })
}
