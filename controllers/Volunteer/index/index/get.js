
module.exports = (req, res) => {

  res.render("volunteer/index", {
    page: "volunteer/index",
    title: "Volunteer",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
