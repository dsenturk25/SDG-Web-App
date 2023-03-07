
const Project = require("../../../models/Projects/project");
const async = require("async");

module.exports = (req, res) => {
  const resArray = [];
  if (req.body.query == "") {
    return res.send({ error: null, success: true, data: resArray });
  }
  Project.find({}, (err, projects) => {
    if (err) return res.send({ error: true, success: false, data: null });
    async.timesSeries(projects.length, (i, next) => {
      if ((projects[i].creator_name.trim().toLowerCase().includes(req.body.query.trim().toLowerCase()) || projects[i].name.trim().toLowerCase().includes(req.body.query.trim().toLowerCase())) && !resArray.includes(projects[i])) {
        resArray.push(projects[i]);
        next();
      } else {
        next();
      }
    }, () => {
      return res.send({ error: null, success: true, data: resArray });
    })
  })
}
