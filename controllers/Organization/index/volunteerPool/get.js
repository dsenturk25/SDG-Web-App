
const Organization = require("../../../../models/Organizations/organization");
const Skill = require("../../../../models/Skills/skill");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const async = require("async");

module.exports = (req, res) => {

    const volunteersBySkills = {};
    const skillNamesArray = [];

    Skill.find({}, (err, skills) => {
        if (err) return res.redirect("/");
        async.timesSeries(skills.length, (i, next1) => {
            const skill = skills[i];

            skillNamesArray.push(skill.name);
            volunteersBySkills[skill.name] = [];

            async.timesSeries(skill.volunteers.length, (j, next2) => {
                const eachVolunteerId = skill.volunteers[j];

                Volunteer.findById(eachVolunteerId, (err, volunteer) => {
                    if (err) return res.redirect("/");

                    volunteersBySkills[skill.name].push({
                        name: volunteer.name + " " + volunteer.surname,
                        email: volunteer.email,
                        phone_number: volunteer.phone_number,
                        birth_date: volunteer.birth_date,
                        city: volunteer.city,
                        country: volunteer.country
                    });

                    next2();
                })
            }, (err) => {
                if (err) return res.redirect("/");

                next1();
            })
        }, (err) => {
            if (err) return res.redirect("/");

            Organization.findById(req.session.organization._id, (err, organization) => {
                if (err) return res.redirect("/");

                return res.render("organization/volunteer-pool", {
                    page: "organization/volunteer-pool",
                    title: `${req.session.organization.name}`,
                    includes: {
                      external: {
                        css: ["page", "general", "index"],
                        js: ["page", "functions"]
                      }
                    }, 
                    organization,
                    volunteersBySkills,
                    skillNamesArray
                })
            })
        })
    })
}
