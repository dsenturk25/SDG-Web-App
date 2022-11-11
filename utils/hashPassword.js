
const bcrypt = require("bcryptjs");

module.exports = function (next) {

  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, 8, (err, password) => {
      if (err) return "bad_request";
      user.password = password;
      next();
    });
  } else {
    next();
  }

}
