
module.exports = (req,res) => {
  res.render("admin/register", {
    page: "admin/register",
    title: "Admin Register",
    includes: {
      external: {
        css: ["page", "general"],
        js: ["page", "functions"]
      }
    }
  })
}
