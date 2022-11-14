
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {

  Admin.createSdgGoal(req.body, (err, goal) => {
    if (err) return res.send(err);
    return res.send(goal);
  })

}
