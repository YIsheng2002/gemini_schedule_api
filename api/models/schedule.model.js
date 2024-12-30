const connection = require("./db.js");

//constructor
const Schedule = function(schedule){
    this.id = schedule.id?? null;
    this.userId = schedule.userId;
    this.day = schedule.day;
}

module.exports = {Schedule};