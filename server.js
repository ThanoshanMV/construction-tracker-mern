//Bring on express
const express = require('express');
const connectDB = require('./config/db');

//initialize app with express
const app = express();

// Connect Database
connectDB();

//putting single end-point to test the server
app.get('/', (req, res) => res.send('API Running'));

//put port in a variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
