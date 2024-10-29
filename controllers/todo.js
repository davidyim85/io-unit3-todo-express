const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');

const router = express.Router();
//create middleware that only exists here that will verify the token's validity
function verifyToken(req, res, next) {
    try {
        
        //const x = "Bearer sean"
        //x.split(' ') => ["Bearer" "sean"]
        //x.split(' ')[1]

        // req.headers.authorization => "Bearer <token>"
        // req.headers.authorization.split(' ') => ["Bearer", "<token>"]
        // req.headers.authorization.split(' ')[1] => "<token>"
        const token = req.headers.authorization.split(' ')[1]; ///["Bearer", "<token>"]
        //decode the token

        // const token = <token>

        //verify using 'supersecret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // req.david = '123'
        // {
        //     "david": "123"
        // }

        // req = {
        //     user: { username: 'sean', _id: '<id of the user sean>'}
        // }
        //attach the decoded object to be equal to the req.user
        req.user = decoded;

        //call next() to invoke the next middleware
        next();


    } catch (error) {
        res.status(401).json({ error: 'invalid auth token' })
    }
}

//lets use the middleware
router.use(verifyToken); //before each route is called have middleware be used

///////////////////////////////////////////////
//////// routes                       ///////// 
///////////////////////////////////////////////

//creates todos
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id; // is the reference for user
        const todo = await Todo.create(req.body);//create the record in the db
        todo._doc.author = req.user; //allows the author object to be the entire req.user
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error })
    }
});


//route to get all 
router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find({ author: req.user._id}).populate('author'); /// .populate means to populate the author property with the user object. The entire thing
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error })
    }
});

//route to get by id
router.get('/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId).populate('author'); /// .populate means to populate the author property with the user object. The entire thing
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error })
    }
});


//route to update
router.put('/:todoId', async (req, res) => {
    try {
        const updated = await Todo.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            { new: true }
        )


        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

//route to delete

router.delete('/:todoId', async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.todoId);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ error: error })
    }
});





module.exports = router;