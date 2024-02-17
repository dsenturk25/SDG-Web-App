
const Organization = require("../../../../models/Organizations/organization");
const fs = require("fs");
const path = require("path");
const { uploadImageToAws } = require("../../../../utils/uploadImageToAws");

module.exports = (req, res) => {

  const imageData = fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + req.file.filename))

  uploadImageToAws(imageData, req.file.filename, req.file.mimetype).then((data) => {
    if (data) {
      const args = {
        organization_type: req.body.organization_type,
        description: req.body.description,
        associated_school: req.body.associated_school,
        phone_number: req.body.phone_number,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        isAccountCompleted: true,
        imageName: req.file.filename
      }
    
      Organization.findByIdAndUpdate(req.session.organization._id, args, (err, updatedVolunteer) => {
        if (err) return res.status(400).send("bad_request");
        fs.unlink(path.join(__dirname + '../../../../../uploads/' + req.file.filename), (err, file) => {
          if (err) console.log("file not deleted");
        });
        return res.redirect("/organization")
      })
    }
    return res.redirect("/organization")
  })
}
