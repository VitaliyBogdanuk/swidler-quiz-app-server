// chatGpt.js
const Configuration = require("openai");
const OpenAIApi = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

exports.askChatGpt = async (req) => {
    if (!configuration.apiKey) {
        throw new Error("OpenAI API key not configured, please follow instructions in README.md");
    }

    if (!req.body.question) {
        throw new Error("Please refine your question and try again!");
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: `Дай відповідь на запитання ${req.body.question}, не пиши нічого зайвого крім твоєї відповіді. Ти маєш відповідати у стилі Кмітливого Лиса. Твоя відповідь має складати не більше 250 символів.` }],
            temperature: 0.6,
            max_tokens: 1500,
        });
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content.trim(); // Just return the data
    } catch (error) {
        console.error(`Error with OpenAI API request: ${error.message}`);
        throw error; // Rethrow the error to be caught by the calling function
    }
}
