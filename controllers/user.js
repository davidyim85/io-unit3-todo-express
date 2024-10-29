const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt'); //this will encrypt PASSWORD (not to mix this up with the Jwt) we cannot save passwords without encryption in a db
const jwt = require('jsonwebtoken'); //this is the package that sends the jwt token. Keep in mind this json needs a key (in our case)
//JWT_SECRET which will be the string that is needed to create the jwt token or decyper it.


//declare a variable that says these are routes
const router = express.Router();

const SALT_LENGTH = 12;

// a route for signing up
router.post('/signup', async (req, res) => {
    try {

        //check if the username is already take
        const userInDatabase = await User.findOne({ username: req.body.username });

        //if this user is found we will return a message that user already taken
        if (userInDatabase) {
            return res.status(400).json({ error: 'User already taken' })
        }

        // req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        //create a new user with hased password
        const user = await User.create({
            username: req.body.username,
            //im going to encrypt the password using bcrypt with the number of rounds (12) of encryptiohn
            password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        });

        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET); //all of our tokens need to be signed using the JSW_SECRET string

        //send that token to the response
        res.status(201).json({ user, token })


    } catch (error) {
        res.status(400).json({ error: error })
    }
})


//a route for signing in
router.post('/signin', async (req, res) => {
    try {
        //find the user by username. We know we can because they are unique
        const user = await User.findOne({ username: req.body.username });
        const doPasswordsMatch = bcrypt.compareSync(req.body.password, user.password)
        //if the user exists and the passwords match
        if (user && doPasswordsMatch) {
            //create a jwt with the username and _id properties and sign it with the JWT_SECRET string
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
            //send that to the response
            res.status(200).json({ token });
        } else {
            //return an error saying either the password or username was incorrect
            res.status(400).json({ error: 'Invalid username or password' })
        }


    } catch (error) {
        res.status(400).json({ error: error })
    }
});



//export these routes
module.exports = router;