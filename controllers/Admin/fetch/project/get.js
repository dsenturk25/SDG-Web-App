
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.fetchProjects(req.body, (err, projectsArray) => {
    if (err) return res.send(err);
    return res.send(projectsArray);
  })
}
