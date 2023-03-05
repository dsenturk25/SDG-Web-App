
const Organization = require("../../../../models/Organizations/organization");
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  let args;
  if (req.file == undefined || req.file == null) {
    args = {
      organization_type: req.body.organization_type,
      description: req.body.description,
      associated_school: req.body.associated_school,
      phone_number: req.body.phone_number,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
    }
  } else {
    args = {
      organization_type: req.body.organization_type,
      description: req.body.description,
      associated_school: req.body.associated_school,
      phone_number: req.body.phone_number,
      photo: fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + req.file.filename)),
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
    }
  }
  Organization.findByIdAndUpdate(req.session.organization._id, args, (err, updatedOrganization) => {
    if (err) return res.status(400).send("bad_request");

    if (req.file) {
      fs.unlink(path.join(__dirname + '../../../../../uploads/' + req.file.filename), (err, file) => {
        if (err) console.log("file not deleted");
      });
    }
    return res.redirect("/organization/profile")
  })
}
