
const Volunteer = require("../../../../models/Volunteer/volunteer");

module.exports = (req, res) => {

  Volunteer.createStackedBarGraph(req.body, (err, graphArray) => {
    if (err) return res.redirect("/organization");

    return res.send(graphArray);
  })
}
