
const Skill = require("../../../../../models/Skills/skill");
const async = require("async");

module.exports = (req, res) => {

    const skillNamesArray = (req.body.names.trim().toLowerCase()).split(",")

    async.timesSeries(skillNamesArray.length, (i, next) => {
        const eachSkill = {
            name: skillNamesArray[i],
            volunteers: []
        }
        Skill.createSkill(eachSkill, (err, skill) => {
            if (err && !skill) return res.redirect("/admin/skills");

            next();
        });
    }, (err) => {
        if (err) return res.send({success: false, err: err});

        return res.redirect("/admin/skills");
    })
}
