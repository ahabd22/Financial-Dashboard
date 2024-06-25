const express = require('express');
const cors = require('cors');
const app = express();
const { db } = require('./db/db');
const { readdirSync } = require('fs');

require('dotenv').config();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').forEach((route) => app.use('/api/v1', require(`./routes/${route}`)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    });
};

server();
