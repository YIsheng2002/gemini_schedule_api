const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const apiKey = process.env.API_KEY;
const fileManager = new GoogleAIFileManager(apiKey);
const path = require("path");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

// async function uploadToGemini(path, mimeType) {
//     const uploadResult = await fileManager.uploadFile(path, {
//       mimeType,
//       displayName: path,
//     });
//     const file = uploadResult.file;
//     console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
//     return file;
// }
  
// async function waitForFilesActive(files) {
//     console.log("Waiting for file processing...");
//     for (const name of files.map((file) => file.name)) {
//       let file = await fileManager.getFile(name);
//       while (file.state === "PROCESSING") {
//         process.stdout.write(".")
//         await new Promise((resolve) => setTimeout(resolve, 10_000));
//         file = await fileManager.getFile(name)
//       }
//       if (file.state !== "ACTIVE") {
//         throw Error(`File ${file.name} failed to process`);
//       }
//     }
//     console.log("...all files ready\n");
// }
  
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
async function getSchedule(user) {
    // const foodFile = path.resolve(
    //     `${__dirname}`,
    //     "../resources/food.csv"
    // );
    // const files = [
    //   await uploadToGemini(foodFile, "text/csv"),
    // ];
  
    // Some files have a processing delay. Wait for them to be ready.
    // await waitForFilesActive(files);
    const chatSession = model.startChat({
        generationConfig,
        history: [
            //{
            // role: "user",
            //  parts: 
            //[
            //     {
            //         fileData: {
            //             mimeType: files[0].mimeType,
            //             fileUri: files[0].uri,
            //         },
            //     },
            //     {text: "Act as a health expert, this is the food data for you to generate schedule later. "},
            // ],
            // },
            // {
            //  role: "model",
            //  parts: [
            //     {text: "Okay, I understand. I have reviewed the provided food data (food.csv). I will use this information to generate meal schedules when you ask me to. I will keep in mind the following when creating schedules:\n\n* **Balanced Nutrition:**  I'll aim for a balance of macronutrients (carbohydrates, protein, and fats) and consider micronutrients when possible based on general knowledge of food composition. The provided data mostly covers macronutrients and energy.\n* **Variety:** I'll try to incorporate a variety of foods from the list to ensure a wider range of nutrients and avoid monotony.\n* **Calorie Goals:** You will need to specify calorie targets or weight goals for me to tailor the schedules effectively.\n* **Dietary Restrictions/Preferences:** Please let me know about any allergies, intolerances, or preferences (vegetarian, vegan, etc.) so I can accommodate them.\n* **Meal Timing and Frequency:** Tell me how many meals and snacks you want per day and what times you prefer to eat.\n* **Practicality:** I will consider portion sizes, preparation time, and the availability of ingredients when suggesting meals.\n\nI'm ready to create personalized meal schedules based on this data when you provide me with your specific requirements. Just ask!\n"},
            //  ],
            // },
            {
            role: "user",
            parts: [
                {text: "I am a software engineer work from 9-6pm from Monday to Friday, I have no any major disease, my age is 25, male, living in the suburban, with 1 family member. Can you generate a healthy week schedule. Please suggest daily calories burnt and daily calories intake."},
            ],
            },
            {
            role: "model",
            parts: [
                {text: "```json\n{\"daily_calories_burnt\": \"2400\", \"daily_calories_intake\": \"2200\", \"schedule_template\": [ {\"startTime\":\"0000\",\"endTime\":\"0700\",\"type\":\"h\",\"title\":\"sleep\"},{\"startTime\":\"0700\",\"endTime\": \"0730\", \"type\": \"h\", \"title\": \"Wake up, drink a glass of water\"}, {\"startTime\": \"0800\", \"endTime\": \"0830\", \"type\": \"m\", \"title\": \"Breakfast\"}, {\"startTime\": \"0830\", \"endTime\": \"0900\", \"type\": \"c\", \"title\": \"Commute/Prepare for work\"}, {\"startTime\": \"0900\", \"endTime\": \"1300\", \"type\": \"c\", \"title\": \"Work\"}, {\"startTime\": \"1300\", \"endTime\": \"1400\", \"type\": \"m\", \"title\": \"Lunch\"},{\"startTime\": \"1400\", \"endTime\": \"1800\", \"type\": \"c\", \"title\": \"Work\"}, {\"startTime\": \"1800\", \"endTime\": \"1900\", \"type\": \"s\", \"title\": \"Exercise\"},{\"startTime\": \"1900\", \"endTime\": \"2000\", \"type\": \"m\", \"title\": \"Dinner\"},{\"startTime\": \"2000\", \"endTime\": \"2300\", \"type\": \"c\", \"title\": \"Free time/Family time\"}, {\"startTime\": \"2300\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}]}, \”weekend_schedule\”: [{\"day\": \"Saturday\",\"schedule\": [{\"startTime\": \"0000\", \"endTime\": \"0900\", \"type\": \"h\", \"title\": \"Sleep\"},{\"startTime\": \"0900\", \"endTime\": \"0930\", \"type\": \"h\", \"title\": \"Wake up, drink water\"},{\"startTime\": \"0930\", \"endTime\": \"1030\", \"type\": \"f\", \"title\": \"Breakfast\"},{\"startTime\": \"1100\", \"endTime\": \"1200\", \"type\": \"s\", \"title\": \"Exercise\"},{\"startTime\": \"1300\", \"endTime\": \"1400\", \"type\": \"f\", \"title\": \"Lunch\"},{\"startTime\": \"1400\", \"endTime\": \"1800\", \"type\": \"c\", \"title\": \"Free time/Hobbies/Errands\"},{\"startTime\": \"1800\", \"endTime\": \"1900\", \"type\": \"f\", \"title\": \"Dinner\"},{\"startTime\": \"1900\", \"endTime\": \"2300\", \"type\": \"c\", \"title\": \"Social activities/Relaxation/Family time\"},{\"startTime\": \"2300\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}]}，{\"day\": \"Sunday\",\"schedule\": [{\"startTime\": \"0000\", \"endTime\": \"0900\", \"type\": \"h\", \"title\": \"Sleep\"},{\"startTime\": \"0900\", \"endTime\": \"0930\", \"type\": \"h\", \"title\": \"Wake up, drink water\"},{\"startTime\": \"0930\", \"endTime\": \"1030\", \"type\": \"f\", \"title\": \"Breakfast\"},{\"startTime\": \"1100\", \"endTime\": \"1200\", \"type\": \"s\", \"title\": \"Exercise\"}，{\"startTime\": \"1300\", \"endTime\": \"1400\", \"type\": \"f\", \"title\": \"Lunch\"},{\"startTime\": \"1400\", \"endTime\": \"1800\", \"type\": \"c\", \"title\": \"Relaxation/Meal prep for the week/Family time\"},{\"startTime\": \"1800\", \"endTime\": \"1900\", \"type\": \"f\", \"title\": \"Dinner\"},{\"startTime\": \"1900\", \"endTime\": \"2200\", \"type\": \"c\", \"title\": \"Relaxation/Prepare for the week\"}，{\"startTime\": \"2200\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}]}]}```"},
            ],
            },
            {
            role: "user",
            parts: [
                {text: "I am a project manager work from 9-5pm from Monday to Friday, I have diabetes before, my age is 36, male with 176cm height and 85kg, living in the suburban, with 1 family member. Can you generate a healthy week schedule. Please suggest daily calories burnt and daily calories intake."},
            ],
            },
            {
            role: "model",
            parts: [
                {text: "```json\n{\"daily_calories_burnt\": \"2600\", \"daily_calories_intake\": \"2000\", \"schedule_template\": [{\"startTime\": \"0000\", \"endTime\": \"0700\", \"type\": \"h\", \"title\": \"Sleep\"}, {\"startTime\": \"0700\", \"endTime\": \"0730\", \"type\": \"h\", \"title\": \"Wake up, drink water, light stretching/yoga\"}, {\"startTime\": \"0730\", \"endTime\": \"0800\", \"type\": \"m\", \"title\": \"Breakfast (focus on protein and fiber)\"}, {\"startTime\": \"0800\", \"endTime\": \"0900\", \"type\": \"c\", \"title\": \"Commute/Prepare for work\"}, {\"startTime\": \"0900\", \"endTime\": \"1300\", \"type\": \"c\", \"title\": \"Work\"}, {\"startTime\": \"1300\", \"endTime\": \"1400\", \"type\": \"m\", \"title\": \"Lunch\"}, {\"startTime\": \"1400\", \"endTime\": \"1700\", \"type\": \"c\", \"title\": \"Work\"}, {\"startTime\": \"1700\", \"endTime\": \"1800\", \"type\": \"s\", \"title\": \"Exercise (Brisk walking, jogging, swimming, or cycling)\"}, {\"startTime\": \"1800\", \"endTime\": \"1900\", \"type\": \"m\", \"title\": \"Dinner\"}, {\"startTime\": \"1900\", \"endTime\": \"2200\", \"type\": \"c\", \"title\": \"Free time/Relax/Family time\"}, {\"startTime\": \"2200\", \"endTime\": \"2300\", \"type\": \"h\", \"title\": \"Wind down for sleep\"}, {\"startTime\": \"2300\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}], \"weekend_schedule\": [{\"day\": \"Saturday\", \"schedule\": [{\"startTime\": \"0000\", \"endTime\": \"0800\", \"type\": \"h\", \"title\": \"Sleep\"}, {\"startTime\": \"0800\", \"endTime\": \"0830\", \"type\": \"h\", \"title\": \"Wake up, drink water\"}, {\"startTime\": \"0830\", \"endTime\": \"0930\", \"type\": \"f\", \"title\": \"Breakfast\"}, {\"startTime\": \"0930\", \"endTime\": \"1100\", \"type\": \"s\", \"title\": \"Longer Exercise session (e.g., hike, extended bike ride)\"}, {\"startTime\": \"1100\", \"endTime\": \"1300\", \"type\": \"f\", \"title\": \"Relax/Free time\"}, {\"startTime\": \"1300\", \"endTime\": \"1400\", \"type\": \"f\", \"title\": \"Lunch\"}, {\"startTime\": \"1400\", \"endTime\": \"1700\", \"type\": \"c\", \"title\": \"Free time/Errands/Social activities\"}, {\"startTime\": \"1700\", \"endTime\": \"1800\", \"type\": \"f\", \"title\": \"Dinner\"}, {\"startTime\": \"1800\", \"endTime\": \"2300\", \"type\": \"c\", \"title\": \"Family Time/Relax\"}, {\"startTime\": \"2300\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}]}, {\"day\": \"Sunday\", \"schedule\": [{\"startTime\": \"0000\", \"endTime\": \"0900\", \"type\": \"h\", \"title\": \"Sleep\"}, {\"startTime\": \"0900\", \"endTime\": \"1000\", \"type\": \"f\", \"title\": \"Brunch\"}, {\"startTime\": \"1000\", \"endTime\": \"1200\", \"type\": \"c\", \"title\": \"Free time/Relaxation/Hobbies\"}, {\"startTime\": \"1200\", \"endTime\": \"1600\", \"type\": \"c\", \"title\": \"Meal prep for the week/Family time\"}, {\"startTime\": \"1600\", \"endTime\": \"1700\", \"type\": \"f\", \"title\": \"Early Dinner\"}, {\"startTime\": \"1700\", \"endTime\": \"2200\", \"type\": \"c\", \"title\": \"Relax/Prepare for the week\"}, {\"startTime\": \"2200\", \"endTime\": \"2400\", \"type\": \"h\", \"title\": \"Sleep\"}]}]}```"},
            ],
            },
        ],
        });
    
        const ch = {
            gender :  user.gender,
            age : user.age,
            occupation_type : user.occupation_type,
            height: user.height,
            weight: user.weight,
            no_of_family_member : user.no_of_family_member,
            area_of_living : user.area_of_living,
            occupation_time : user.occupation_time,
            workingDays : "Monday - Friday",
            health_history : user.health_history,
        };
        console.log(ch);
        const prompt = `I am a ${ch.occupation_type} work from ${ch.occupation_time} from Monday to Friday, I have ${ch.health_history} before, my age is ${ch.age}, male with ${ch.height}cm height and ${ch.weight}kg, living in the ${ch.area_of_living}, with ${ch.no_of_family_member} family member. Can you generate a healthy week schedule. Please suggest daily calories burnt and daily calories intake.`;
        const result = await chatSession.sendMessage(prompt);
        const response = await result.response;
        console.log(response.text());
        return JSON.parse(response.text());
}


module.exports = {
    getSchedule,
};