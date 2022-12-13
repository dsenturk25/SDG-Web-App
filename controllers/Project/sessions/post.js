
const Project = require("../../../models/Projects/project");

module.exports = (req, res) => {

  Project.addSessionManual(req.body, (err, project) => {
    if (err) return res.redirect("/organization");

    return res.redirect("/organization");
  })

}

