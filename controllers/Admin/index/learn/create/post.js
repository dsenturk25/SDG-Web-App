
const Learn = require("../../../../../models/Learn/learn");

module.exports = (req, res) => {
  Learn.createLearn(req.body, (err, newLearn) => {
    if (err) return res.status(400).send({ err });
    return res.redirect("/admin/learn");
  })
}
