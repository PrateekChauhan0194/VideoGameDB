const connectMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

connectMongo();

app.use(express.json());
app.use(cors());

// Available routes
app.use('/api/v1/videogames', require('./routes/videogames'));

// Hello world route
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});