
const Organization = require("../../../models/Organizations/organization");

module.exports = (req, res) => {
  Organization.deleteProject(req.body, (err, project) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(project);
  })
}

