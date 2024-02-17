
const Admin = require("../../../../models/Admin/admin");
const Activist = require("../../../../models/Activist/activist");
const async = require("async");

module.exports = (req, res) => {

    const activistsArray = [];

    Admin.findById(req.session.admin._id, (err, admin) => {
        if (err) return res.send(err);

        Activist.find({}, (err, activists) => {
            if (err) return res.send(err);

            async.timesSeries(activists.length, (i, next) => {
                const eachActivist = activists[i];
                const eachActivistObject = {
                    _id: eachActivist._id,
                    name: eachActivist.name,
                    description: eachActivist.description,
                    isActivistOfWeek: eachActivist.isActivistOfWeek
                }

                activistsArray.push(eachActivistObject);
                next();
            }, (err) => {
                if (err) return res.send(err);

                return res.render("admin/activists", {
                    page: "admin/activists",
                    title: "Admin Activists",
                    includes: {
                    external: {
                        css: ["page", "general"],
                        js: ["page", "functions"]
                    }
                    }, 
                    activistsArray,
                    admin
                })
            })
        })
    })
}
