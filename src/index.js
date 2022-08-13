const express = require('express');
require('dotenv').config();

const app = express();

app.use('/', (req, res) => {
    res.status(200).send('<h1>Hello World!</h1>')
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));