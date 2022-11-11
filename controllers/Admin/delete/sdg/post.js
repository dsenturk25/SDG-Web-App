
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.deleteSdg(req.body, (err, sdg) => {
    if (err) return res.send(err);
    return res.send(sdg);
  })
}
