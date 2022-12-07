
module.exports = (req, res) => {

  res.render("index/register", {
    page: "index/register",
    title: "Volunteer login",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
