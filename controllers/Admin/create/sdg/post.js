
const Admin = require("../../../../models/Admin/admin");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

  Admin.createSdgGoal({
    name: req.body.name,
    number: req.body.number,
    image: fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + req.file.filename)),
  }, (err, goal) => {

    fs.unlink(path.join(__dirname + '../../../../../uploads/' + req.file.filename), (err, file) => {
      if (err) console.log("file not deleted");
    });
    if (err) return res.redirect("/admin/sdg");
    return res.redirect("/admin/sdg");
  })
}
