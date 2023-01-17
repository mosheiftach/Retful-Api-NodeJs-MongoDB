const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Creating user
router.post('/',async (req, res) => {
    const newUser = new User({
            id: req.body.id,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            birthday: req.body.birthday,
            marital_status: req.body.martialstatus
        }
    );
    try{
        await newUser.save();
        res.redirect("/")
    }catch(err){
        res.status(400).json({massage:err.message})
    }
})


module.exports = router