
const Organization = require("../../../models/Organizations/organization");

module.exports = (req, res) => {

  Organization.createProject(req.body, (err, project) => {
    if (err) return res.status(400).send(err);
    res.status(201).send(project);
  })
}
