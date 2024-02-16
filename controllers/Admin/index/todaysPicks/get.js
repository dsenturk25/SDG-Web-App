
const Admin = require("../../../../models/Admin/admin");
const Project = require("../../../../models/Projects/project");
const async = require("async");

module.exports = (req,res) => {

    const projectsArray = [];

    Admin.findById(req.session.admin._id, (err, admin) => {
        if (err) return res.send(err);

        Project.find({}, (err, projects) => {
            if (err) return res.send(err);

            async.timesSeries(projects.length, (i, next) => {
                const project = projects[i];
                const projectsObject = {
                    _id: project._id,
                    name: project.name,
                    short_description: project.short_description,
                    isTodaysPick: project.isTodaysPick,
                    creator_name: project.creator_name
                };

                projectsArray.push(projectsObject);
                next();
            }, (err) => {
                if (err) return res.send(err);
                res.render("admin/todaysPicks", {
                    page: "admin/todaysPicks",
                    title: "Admin Todays Picks",
                    includes: {
                    external: {
                        css: ["page", "general"],
                        js: ["page", "functions"]
                    }
                    }, 
                    projectsArray,
                    admin
                })
            })
        })
    })
}

