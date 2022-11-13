
const Organization = require("../../../models/Organizations");

module.exports = (req, res) => {
  Organization.findProjectById(req.body, (err, project) => {
    if (err) return res.send(err);
    return res.send(project);
  })
}
