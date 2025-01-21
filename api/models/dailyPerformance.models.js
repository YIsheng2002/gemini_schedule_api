const dailyPerformance = function(dailyPerformance){
    this.id = dailyPerformance.id;
    this.date = dailyPerformance.date;
    this.totalPercentage = dailyPerformance.totalPercentage;
    this.userId = dailyPerformance.userId;
    this.totalTask = dailyPerformance.totalTask;
    this.completedTask = dailyPerformance.completedTask;
}

module.exports = dailyPerformance;