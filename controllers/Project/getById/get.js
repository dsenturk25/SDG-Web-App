
const Organization = require("../../../models/Organizations");

module.exports = (req, res) => {
  Organization.findAllProjects(req.body, (err, projects) => {
    if (err) return res.send(err);
    return res.send(projects);
  })
}
