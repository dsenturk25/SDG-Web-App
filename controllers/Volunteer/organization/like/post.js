
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  const organizationId = req.body.organizationId;
  const volunteerId = req.body.volunteerId;
  const likeStatus = req.body.likeStatus;

  Volunteer.findById(volunteerId, (err, volunteer) => {
    if (err) return res.send("bad_request");



    if (likeStatus) {
      volunteer.liked_organizations.push(organizationId);
      volunteer.save()
    } else if (!likeStatus) {
      const filteredLikedOrganizationsArray = volunteer.liked_organizations.filter(organization_id => {
        return organization_id != organizationId;
      })
      volunteer.liked_organizations = filteredLikedOrganizationsArray;
      volunteer.save()
    }

    res.status(200).send(volunteer);
  })
}
