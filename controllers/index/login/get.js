
module.exports = (req, res) => {

  res.render("index/login", {
    page: "index/login",
    title: "Volunteer login",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
