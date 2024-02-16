
const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({

    master_document_id: {
        type: String,
        required: true,
        trim: true, unique: true
    },

    url: {
        type: String,
        required: true
    }
})

imageSchema.statics.uploadToAws = function (body, callback) {

    const AWS = {};

    // upload to aws base64 image
}

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
