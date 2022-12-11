
const Organization = require("../../../models/Organizations/organization");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {

  req.body.photo = fs.readFileSync(path.join(__dirname + '../../../../uploads/' + req.file.filename));

  Organization.createProject(req.body, (err, project) => {
    if (err) return res.status(400).send(err);

    fs.unlink(path.join(__dirname + '../../../../uploads/' + req.file.filename), (err, file) => {
      if (err) console.log("file not deleted");
    });

    res.redirect("/organization");
  })
}
