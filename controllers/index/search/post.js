
const Project = require("../../../models/Projects/project");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {
  const resArray = [];
  if (req.body.query == "") {
    return res.send({ error: null, success: true, data: resArray });
  }
  Project.find({}, (err, projects) => {
    if (err) return res.send({ error: true, success: false, data: null });
    async.timesSeries(projects.length, async (i, next) => {
      if ((projects[i].creator_name.trim().toLowerCase().includes(req.body.query.trim().toLowerCase()) || projects[i].name.trim().toLowerCase().includes(req.body.query.trim().toLowerCase())) && !resArray.includes(projects[i])) {

        let photo = "";

        if (projects[i].imageName && projects[i].imageName.length > 0) {
          photo = await retrieveImageFromImageName(projects[i].imageName);
        } else {
          photo = Buffer.from(projects[i].photo).toString('base64');
        }

        resArray.push({
          _id: projects[i]._id,
          name: projects[i].name,
          photo: photo,
          creator_name: projects[i].creator_name,
          imageName: projects[i].imageName
        });
        
      }
    }, () => {
      return res.send({ error: null, success: true, data: resArray });
    })
  })
}
