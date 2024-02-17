
const Admin = require("../../../../models/Admin/admin");
const fs = require("fs");
const path = require("path");
const { uploadImageToAws } = require("../../../../utils/uploadImageToAws");

module.exports = (req, res) => {


  const imageData = fs.readFileSync(path.join(__dirname + '../../../../../uploads/' + req.file.filename));

  uploadImageToAws(imageData, req.file.filename, req.file.mimetype).then((data) => {
    if (data) {
      const imageName = req.file.filename;

      Admin.createSdgGoal({
        name: req.body.name,
        number: req.body.number,
        imageName: imageName,
      }, (err, goal) => {
    
        fs.unlink(path.join(__dirname + '../../../../../uploads/' + req.file.filename), (err, file) => {
          if (err) console.log("file not deleted");
        });
        if (err) return res.redirect("/admin/sdg");
        return res.redirect("/admin/sdg");
      })
    } else {
      return res.redirect("/admin/sdg");
    }
  })
  .catch((err) => {
    console.log(err);
  })
}
