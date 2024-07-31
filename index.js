const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/openai/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const api_key = process.env.OPENAI_API_KEY;

        if (!message) {
            console.error('Message is missing in the request body');
            return res.status(400).json({ error: 'Message is missing in the request body' });
        }

        if (!api_key) {
            console.error('OpenAI API key not found');
            return res.status(500).json({ error: 'OpenAI API key not found' });
        }

        console.log('Received message:', message);
        console.log('Using OpenAI API key:', api_key);

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('OpenAI response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Failed to get response from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from OpenAI', details: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
