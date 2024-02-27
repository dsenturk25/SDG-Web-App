
const Volunteer = require("../../../models/Volunteer/volunteer");
const Skills = require("../../../models/Skills/skill");
const async = require("async");

module.exports = (req, res) => {

  const skillNamesArray = [];

  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (volunteer.isAccountCompleted) return res.redirect("/");

    Skills.find({}, (err, skills) => {
      async.timesSeries(skills.length, (i, next) => {
        const eachSkill = skills[i];

        skillNamesArray.push({
          _id: eachSkill._id,
          name: eachSkill.name
        })

        next();
      }, (err) => {
        if (err) return res.redirect("/");

        return res.render("volunteer/complete", {
          page: "volunteer/complete",
          title: "Complete Your Account",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          volunteer,
          skillNamesArray
        })
      })
    })
  })
}

