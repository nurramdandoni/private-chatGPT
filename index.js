const express = require('express');
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
// const request = require('request');
// const bodyParser = require('body-parser');
const app = express();

// const CHATGPT_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
// const CHATGPT_API_URL = 'https://api.example.com/chatgpt';
// const CHATGPT_API_URL = 'https://chat.openai.com/chat';
// const CHATGPT_API_KEY = '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';

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.CHATGPT_API_KEY,
})

const openai = new OpenAIApi(configuration);

app.post("/chatGPT", async(req, res) => {
    const { task } = req.body
    try {
        const respon = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: task.task,
        })
        return res.status(200).json({
            reply: "Ok!",
            data: respon.data.choices[0].text
        })
    } catch (error) {
        return res.json(error);
    }
})

// app.get('/chatgpt', (req, res) => {
//     res.send('Welcome to ChatGPT API!');
// });

// app.post('/chatgpt', (req, res) => {
//     const { message } = req.body;
//     const options = {
//         url: CHATGPT_API_URL,
//         headers: {
//             'Authorization': `Bearer ${CHATGPT_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             prompt: `${message}\nBot:`,
//             max_tokens: 60,
//             temperature: 0.5,
//         }),
//     };
//     request.post(options, (error, response, body) => {
//         if (error) {
//             console.log(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             // const { choices } = JSON.parse(body).choices[0];
//             // const botResponse = choices[0].text.trim().split('Bot:')[1].trim();
//             // res.json({ message: botResponse });
//             res.json({ messageReply: body });
//         }
//     });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});