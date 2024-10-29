///////////////////////////////////////////////
//////// User model                   ///////// 
///////////////////////////////////////////////

//import in our connection object. We are not importing in the npm package
//this is the connection object. The npm package is imported there
const mongoose = require('./connection');


//schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
});


const Users = mongoose.model('user', UserSchema);

module.exports = Users;
