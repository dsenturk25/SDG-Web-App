
const mongoose = require("mongoose");

const learnSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  activistId: {
    type: String,
    required: true
  },

  video_link: {
    type: String,
    required: true
  }
})

learnSchema.statics.createLearn = function (body, callback) {
  const newLearn = new Learn(body);
  if (newLearn) {
    newLearn.save();
    return callback(null, newLearn);
  }
  return callback("bad_request");
}

const Learn = mongoose.model("Learn", learnSchema);

module.exports = Learn;
