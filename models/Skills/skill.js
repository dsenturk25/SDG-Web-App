
const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    volunteers: [
        {
            type: mongoose.Types.ObjectId 
        }
    ]
})

skillSchema.statics.createSkill = function (body, callback) {
    Skill.findOne({name: body.name}, (err, skill) => {
        if (err || skill) return callback("bad_request");

        if (!skill) {
            const newSkill = new Skill(body);
            if (newSkill) {
                newSkill.save();
                return callback(null, newSkill);
            }
            return callback("bad_request");            
        }
    })
}

const Skill = mongoose.model("Skills", skillSchema);

module.exports = Skill;
