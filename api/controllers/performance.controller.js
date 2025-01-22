const {
    getDailyPerformance,
    getMonthlyPerformance
} = require('../services/performance.service');

exports.fetchDailyPerformance = async (req, res) => {
    const userId = req.params.user_id;
    const date = req.params.date;
    if (!userId || !date) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const performance = await getDailyPerformance(userId, date);
        if (!performance) {
            return res.status(404).json({
                message: "Performance not found"
            });
        }
        return res.status(200).json({
            message: "Successfully fetched performance",
            performance: performance
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

// fetch monthly performance for a user
exports.fetchMonthlyPerformance = async (req, res) => {
    const userId = req.params.user_id;
    const date = req.params.date;
    if (!userId || !date) {
        return res.status(400).json({
            message: "Invalid request"
        });
    }
    try {
        const performance = await getMonthlyPerformance(userId, date);
        if (!performance) {
            return res.status(404).json({
                message: "Performance not found"
            });
        }
        return res.status(200).json({
            message: "Successfully fetched performance",
            performance: performance
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
