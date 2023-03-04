
const Project = require("../models/Projects/project");
const schedule = require("node-schedule");

module.exports = async () => {
  schedule.scheduleJob('0 0 * * *', () => {
    Project.updateTodaysPicks({}, (err, todaysPicksIndexes) => {
      if (err) return console.log("Error while scheduling.")
      return console.log("Updated todays picks as " + todaysPicksIndexes);
    })
  })
}
