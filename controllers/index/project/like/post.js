
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  const projectId = req.body.projectId;
  const volunteerId = req.body.volunteerId;
  const likeStatus = req.body.likeStatus;

  Volunteer.findById(volunteerId, (err, volunteer) => {
    if (err) return res.send("bad_request");

    if (likeStatus) {
      volunteer.liked_projects.push(projectId);
      volunteer.save()
    } else if (!likeStatus) {
      const filteredLikedProjectsArray = volunteer.liked_projects.filter(project_id => {
        return project_id != projectId;
      })
      volunteer.liked_projects = filteredLikedProjectsArray;
      volunteer.save()
    }

    res.status(200).send(volunteer);
  })
}
