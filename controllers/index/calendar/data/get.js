
const Project = require("../../../../models/Projects/project");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const { addTimes } = require("../../../../utils/timeOperations");
const async = require("async");

module.exports = (req, res) => {
  Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
    if (err) return res.redirect("/");

    const sessionsArray = [];

    async.timesSeries(volunteer.projects.length, (i, next1) => {
        const projectId = volunteer.projects[i];
        Project.findById(projectId, (err, project) => {
            if (err) return res.redirect("/");
            async.timesSeries(project.sessions.length, (j, next2) => {
                const session = project.sessions[j];

                const endDate = `${session.session_date.split("-")[0]}-${session.session_date.split("-")[1]}-${parseInt(session.session_date.split("-")[2]) + 1}`
                const sessionData = {
                    groupId: project._id,
                    id: `${j + 1}-${project.name}`,
                    startRecur: session.session_date,
                    endRecur: endDate,
                    title: `${j + 1}-${project.name}`,
                    startTime: session.session_start_time,
                    endTime: addTimes(session.session_start_time, session.session_duration),
                    url: `/project?_id=${project._id}`
                    // environment: session.session_environment
                };
                
                sessionsArray.push(sessionData);
                next2();
            }, (err) => {
                if (err) return res.redirect("/");
                next1();
            })
        })
    }, (err) => {
        if (err) return res.redirect("/");
        return res.send(sessionsArray);
    })
  })
}

