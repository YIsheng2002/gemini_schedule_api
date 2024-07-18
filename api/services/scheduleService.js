const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

const getSchedule = async (req, res) => {
    try {
        const ch = {
            gender : "female",
            age : 25,
            occupation : "Manager",
            bmi : 28,
            noOfChildren : 2,
            smoker : "no",
            country : "Malaysia",
            workingTime : "9am - 5pm",
            workingDays : "Monday - Friday",
            healthProblem : ["hypertension"],
        };
        const prompt = JSON.stringify(ch) + "Suggest me one week schedule obey healthy lifestyle.";
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const obj = {
            "response": text,
        }
        return obj;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSchedule,
};