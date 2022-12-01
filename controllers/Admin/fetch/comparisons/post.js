
const Admin = require("../../../../models/Admin/admin");

module.exports = (req, res) => {
  Admin.createStackedBarGraph(req.body, (err, graphArray) => {
    if (err) return res.redirect("/admin");
    return res.send(graphArray);
  })
}
