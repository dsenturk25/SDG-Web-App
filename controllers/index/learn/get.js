
const Volunteer = require("../../../models/Volunteer/volunteer");
const Learn = require("../../../models/Learn/learn");
const Activist = require("../../../models/Activist/activist");
const async = require("async");
const { retrieveImageFromImageName } = require("../../../utils/uploadImageToAws");

module.exports = (req, res) => {
  Activist.find({}, (err, activists) => {
    if (err) return res.redirect("/");

    async.timesSeries(activists.length, async (i, next) => {
      const activist = activists[i];
      if (activist.imageName && activist.imageName.length > 0) {
        activist.profile_photo = await retrieveImageFromImageName(activist.imageName);
      } else {
        if (err) return res.redirect("/");
      }
    }, (err) => {
      if (err) return res.redirect("/");

      Learn.find({}, (err, learnArray) => {
        if (err) return res.redirect("/");

      if (req.session.volunteer && req.session.volunteer._id) {
        Volunteer.findById(req.session.volunteer._id, (err, volunteer) => {
          if (err) return res.redirect("/");

            res.render("index/learn", {
              page: "index/learn",
              title: "Learn",
              includes: {
                external: {
                  css: ["page", "general"],
                  js: ["page", "functions"]
                }
              },
              volunteer,
              learnArray,
              activists
            })

        })    
      } else {
        res.render("index/learn", {
          page: "index/learn",
          title: "Learn",
          includes: {
            external: {
              css: ["page", "general"],
              js: ["page", "functions"]
            }
          },
          learnArray,
          activists
        })
      }
    })
    })
})
}
