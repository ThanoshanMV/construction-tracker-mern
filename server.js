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
// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// admin routes
app.use('/api/admin/users', require('./routes/api/admin/users'));
app.use('/api/admin/auth', require('./routes/api/admin/auth'));
app.use('/api/admin/profile', require('./routes/api/admin/profile'));
app.use('/api/admin/profile/password', require('./routes/api/admin/profile'));

// user routes
app.use('/api/employee/users', require('./routes/api/employee/users'));
app.use('/api/employee/auth', require('./routes/api/employee/auth'));
app.use('/api/employee/profile', require('./routes/api/employee/profile'));
app.use(
  '/api/employee/profile/password',
  require('./routes/api/employee/profile')
);

// record routes
app.use('/api/records', require('./routes/api/record/records'));
app.use('/api/records/search', require('./routes/api/record/records'));

// authentication route (reset password)
app.use('/api', require('./routes/api/auth'));

//put port in a variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
