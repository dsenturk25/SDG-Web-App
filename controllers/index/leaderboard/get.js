
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (err) return res.redirect("/");
    Volunteer.getLeaderBoardDataOfUser(volunteer, (err, leaderboardData) => {
      if (err) return res.redirect("/");
      res.render("index/leaderboard", {
        page: "index/leaderboard",
        title: "Leaderboard",
        includes: {
          external: {
            css: ["page", "general"],
            js: ["page", "functions"]
          }
        },
        leaderboardData,
        volunteer
      })
    })
  })
}
