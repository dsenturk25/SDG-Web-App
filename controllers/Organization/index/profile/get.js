
const Project = require("../../../../models/Projects/project");
const Sdg = require("../../../../models/SDGs/sdg");

module.exports = (req, res) => {

  const organization = req.session.organization;

  Project.find({creator_id: req.session.organization._id}, (err, projects) => {

    if (err) return res.redirect("/");

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      project.photo = Buffer.from(project.photo).toString('base64');
    }

    Sdg.find({}, (err, sdgs) => {

      if (err) return res.redirect("/");

      for (let i = 0; i < sdgs.length; i++) {
        const sdg = sdgs[i];
        sdg.image = Buffer.from(sdg.image).toString('base64');
      }  

      res.render("organization/profile", {
        page: "organization/profile",
        title: `${req.session.organization.name}`,
        includes: {
          external: {
            css: ["page", "general", "index"],
            js: ["page", "functions"]
          }
        }, 
        organization,
        projects,
        sdgs
      })
    })
  })
}
