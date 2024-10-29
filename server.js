/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config();
const express = require('express'); //the important 
const cors = require('cors'); //because we will ahve a different url calling the express url. If urls are different cors errors. Importing this and making use of it will prevent this
//import the user routes
const userRouter = require('./controllers/user'); //new
const todoRouter = require('./controllers/todo');
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(cors()); //this means white list all urls
app.use(express.json()); //this means we can send json data from our controllers

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/users', userRouter);  //new
app.use('/todo', todoRouter);  //new
app.get('/', (req, res) => {
    try{
        res.send('hello world')
    }catch(err){
        res.status(400).json(err)
    }
});




const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`now listening to port: ${PORT}`)
})






