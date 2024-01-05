
const Organization = require("../../../../models/Organizations/organization");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const args = {
    organization_type: req.body.organization_type,
    description: req.body.description,
    associated_school: req.body.associated_school,
    phone_number: req.body.phone_number,
    photo: fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + req.file.filename)),
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    isAccountCompleted: true
  }

  Organization.findByIdAndUpdate(req.session.organization._id, args, (err, updatedVolunteer) => {
    if (err) return res.status(400).send("bad_request");
    fs.unlink(path.join(__dirname + '../../../../../uploads/' + req.file.filename), (err, file) => {
      if (err) console.log("file not deleted");
    });
    return res.redirect("/organization")
  })
}
