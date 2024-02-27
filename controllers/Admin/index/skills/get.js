
const Admin = require("../../../../models/Admin/admin");
const Skill = require("../../../../models/Skills/skill");
const async = require("async");

module.exports = (req, res) => {

    const skillNamesArray = [];

    Admin.findById(req.session.admin._id, (err, admin) => {
        if (err) return res.send(err);

        Skill.find({}, (err, skills) => {

            if (err) return res.send(err);

            async.timesSeries(skills.length, (i, next) => {
                const skill = skills[i];
                skillNamesArray.push(skill.name);
                next();
            }, (err) => {
                if (err) return res.send(err);

                res.render("admin/skills", {
                    page: "admin/skills",
                    title: "Admin Skills",
                    includes: {
                    external: {
                        css: ["page", "general"],
                        js: ["page", "functions"]
                    }
                    }, 
                    skillNamesArray,
                    admin
                });
            })
        })
    })
}

