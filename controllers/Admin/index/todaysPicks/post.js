
const Project = require("../../../../models/Projects/project");

module.exports = (req, res) => {

    Project.findByIdAndUpdate(req.body.project_id, {isTodaysPick: req.body.status}, (err, project) => {
        if (err) return res.send({success: false, err: err});
        return res.send({success:true, res: project});
    })
}
