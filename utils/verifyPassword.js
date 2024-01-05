
const bcrypt = require("bcryptjs");

module.exports = function (password1, password2, callback) {
  bcrypt.compare(password1, password2, (err, res) => {
    if (err || !res) return callback(null);
    else if (res) return callback(true);
  })
}
