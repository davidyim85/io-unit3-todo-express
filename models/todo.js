///////////////////////////////////////////////
//////// TODO model                   ///////// 
///////////////////////////////////////////////

//import in our connection object. We are not importing in the npm package
//this is the connection object. The npm package is imported there
const mongoose = require('./connection');

const TodoSchema = new mongoose.Schema({
    text: { type: String, rquired: true },
    isComplete: { type: Boolean, rquired: true },
    duration:  { type: Number, rquired: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


//create a variable that creates a models from the schema variable 'TodoSchema'. This variable
//will be the 'thing' that is used to define our records in the collection
const Todo = mongoose.model('todo', TodoSchema);

//export that Todo variable
module.exports = Todo;


