const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://127.0.0.1:5500', 'https://hashemabdou.github.io/'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const messages = req.body.messages;
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7
        })
    });

    const data = await response.json();
    res.json({ message: data.choices[0].message.content.trim() });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
