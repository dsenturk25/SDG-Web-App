
module.exports = (req, res) => {

  res.render("index/index", {
    page: "index/index",
    title: "Volunteer",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
