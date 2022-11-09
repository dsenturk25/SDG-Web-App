
const bcrypt = require("bcryptjs");

module.exports = function (next) {

  const volunteer = this;

  if (volunteer.isModified("password")) {
    bcrypt.hash(volunteer.password, 8, (err, password) => {
      if (err) return "bad_request";
      volunteer.password = password;
      next();
    });
  } else {
    next();
  }

}
