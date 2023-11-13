
const Volunteer = require("../../../models/Volunteer/volunteer");
const Learn = require("../../../models/Learn/learn");

module.exports = (req, res) => {
  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (err) return res.redirect("/");

    Learn.find({}, (err, learnArray) => {
      if (err) return res.redirect("/");

      res.render("index/learn", {
        page: "index/learn",
        title: "Learn",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        volunteer,
        learnArray
      })
    })
  })
}
