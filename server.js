//Bring on express
const express = require('express');
const connectDB = require('./config/db');

//initialize app with express
const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//putting single end-point to test the server
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/persons', require('./routes/api/person/persons'));
app.use('/api/auth', require('./routes/api/person/auth'));
app.use('/api/profiles', require('./routes/api/person/profiles'));

app.use('/api/records', require('./routes/api/record/records'));
// app.use('/api/records/search', require('./routes/api/record/records'));

// below is for resetting the password
app.use('/api', require('./routes/api/auth'));

//put port in a variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
