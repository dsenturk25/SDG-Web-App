
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.fetchSdgs(req.body, (err, sdgArray) => {
    if (err) return res.send(err);
    return res.send(sdgArray);
  })
}
