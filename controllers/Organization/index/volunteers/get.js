
const Sdg = require("../../../../models/SDGs/sdg");
const Volunteer = require("../../../../models/Volunteer/volunteer");
const async = require("async");

module.exports = (req, res) => {

  const organization = req.session.organization;

  Sdg.find({}, (err, sdgs) => {

    if (err) return res.redirect("/");

    for (let i = 0; i < sdgs.length; i++) {
      const sdg = sdgs[i];
      sdg.image = Buffer.from(sdg.image).toString('base64');
    }  

    let volunteers = [];

    async.timesSeries(organization.volunteers.length, (i, next) => {
      const volunteer_id = organization.volunteers[i];
      Volunteer.findById(volunteer_id, (err, volunteer) => {
        if (err) res.redirect("/organization");
        volunteers.push(volunteer);
        next();
      })
    }, (err, object) => {
      if (err) res.redirect("/organization");

      res.render("organization/volunteers", {
        page: "organization/volunteers",
        title: `${req.session.organization.name}`,
        includes: {
          external: {
            css: ["page", "general", "index"],
            js: ["page", "functions"]
          }
        }, 
        organization,
        sdgs,
        volunteers
      })

    })
  })
}
