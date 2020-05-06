//Bring on express
const express = require('express');

//initialize app with express
const app = express();

//putting single end-point to test the server
app.get('/', (req, res) => res.send('API Running'));

//put port in a variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
