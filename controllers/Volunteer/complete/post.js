
const Volunteer = require("../../../models/Volunteer/volunteer");
const Skill = require("../../../models/Skills/skill");
const async = require("async");

module.exports = (req, res) => {

  const args = {
    name: req.body.name,
    surname: req.body.surname,
    birth_date: req.body.birth_date,
    school: req.body.school,
    school_number: req.body.school_number,
    city: req.body.city,
    country: req.body.country,
    bio: req.body.bio,
    gender: req.body.gender,
    phone_number: req.body.phone_number,
    skills: req.body.skills,
    isAccountCompleted: true
  }
  Volunteer.findByIdAndUpdate(req.session.volunteer._id, args, (err, updatedVolunteer) => {
    if (err) return res.status(400).send("bad_request");

    async.timesSeries(req.body.skills.length, (i, next) => {
      const eachSkillId = req.body.skills[i];

      Skill.findById(eachSkillId, async (err, skill) => {
        if (err) return res.status(400).send("bad_request");
        skill.volunteers.push(updatedVolunteer._id);
        skill.save();
        next();
      })
    }, (err) => {
      if (err) return res.status(400).send("bad_request");

      return res.redirect("/")
    })
  })
}
