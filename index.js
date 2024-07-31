const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const openaiRouter = require('./api/openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/api/openai', openaiRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
