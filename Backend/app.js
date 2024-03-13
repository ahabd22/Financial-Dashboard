const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('Hello World')
})


const server = async () => {
    try {
        const db = await connectToDatabase();
        app.listen(PORT, () => {
            console.log('Listening to port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

server();