
module.exports = (req, res) => {
  req.session.volunteer = {};
  return res.send({ err: false, success: true });
}
