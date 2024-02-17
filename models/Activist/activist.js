
const mongoose = require("mongoose");

const activistSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imageName: {
      type: String,
      required: true,
      unique: true
    },

    profile_photo: {
      type: String,
      required: false
    },

    isActivistOfWeek: {
        type: Boolean,
        default: false
    }
})

activistSchema.statics.createActivist = function (body, callback) {
  const newActivist = new Activist(body);
  if (newActivist) {
    newActivist.save();
    return callback(null, newActivist);
  }
  return callback("bad_request");
}

const Activist = mongoose.model("Activist", activistSchema);

module.exports = Activist;
