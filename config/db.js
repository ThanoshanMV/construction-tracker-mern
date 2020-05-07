/**
 * Setup mongoDB connection
 */

const mongoose = require('mongoose');
//we need to bring in config package to access mongoURI inside config
const config = require('config');
//get mongoURI value
const db = config.get('mongoURI');

const connectDB = async () => {
  //we have to wrap the code inside try-catch block as there are times our db fails to connect
  try {
    //https://www.npmjs.com/package/mongoose
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB is connected!');
  } catch (err) {
    console.error(err);
    //exit the process with failure
    process.exit(1);
  }
};

//Finally, we need to export connectDB function
module.exports = connectDB;
