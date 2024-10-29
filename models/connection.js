//this is the file that will be the object that is used to connect to the db.
//this object will be imported on the schema files


require('dotenv').config(); //load in my environment variables
const mongoose = require('mongoose'); //import mongooes. This is the ODM package that helps with communication to mongo db 


//establish that connection to the mongo db using our connection string
mongoose.connect(process.env.DATABASE_URL)

//OPTIONAL LINES OF CODE: will checked the status of our connection to the db
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected'))
    .on('error', (err) => console.log('error', err));


//export the mongoose configuration for later use
module.exports = mongoose; 