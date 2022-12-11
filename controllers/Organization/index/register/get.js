module.exports = (req, res) => {

  res.render("organization/register", {
    page: "organization/register",
    title: "Organization Sign Up",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
