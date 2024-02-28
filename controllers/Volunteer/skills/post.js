
const Skill = require("../../../models/Skills/skill");
const Volunteer = require("../../../models/Volunteer/volunteer");

module.exports = (req, res) => {
    const volunteerId = req.session.volunteer._id;

    Volunteer.findById(volunteerId, (err, volunteer) => {
        if (err) return res.redirect("/");
    
        if (!volunteer.skills.includes(req.body.skillId)) {
            volunteer.skills.push(req.body.skillId);
        } else {
            const index = volunteer.skills.indexOf(req.body.skillId);
            volunteer.skills.splice(index, 1);
        }

        Skill.findById(req.body.skillId, (err, skill) => {
            if (err) return res.redirect("/");

            if (!skill.volunteers.includes(volunteer._id)) {
                skill.volunteers.push(volunteer._id);
            } else {
                const index = skill.volunteers.indexOf(req.body.skillId);
                skill.volunteers.splice(index, 1);
            }

            volunteer.save();
            skill.save();
            
            return res.send({ success: true, res: volunteer._id });
        })
    })
}
