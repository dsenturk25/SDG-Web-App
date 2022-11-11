
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.deleteProject(req.body, (err, project) => {
    if (err) return res.send(err);
    return res.send(project);
  })
}
