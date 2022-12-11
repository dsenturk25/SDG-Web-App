module.exports = (req, res) => {

  res.render("organization/login", {
    page: "organization/login",
    title: "Organization Login",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }, 
  })
}
