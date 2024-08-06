const express = require('express');
const cors = require('cors'); // Add this line
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Add this line
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4-turbo', // Use the GPT-4-turbo model
            messages: [
                { role: 'system', content: 'You are a helpful and supportive mental health therapist.' },
                { role: 'user', content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.7
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message.content.trim());
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
