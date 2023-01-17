const express = require('express');
const router = express.Router();
const Categories = require('../models/categories')



//Generating a report
router.post('/',async (req, res) => {
    let categoryResult = [];

    categoryResult = await Categories.find({
        "id": {$in: [`${req.body.reportid}`]},
        "year": {$in: [`${req.body.yearofreport}`]},
        "month": {$in: [`${req.body.monthofreport}`]}
    }).exec();
    if (categoryResult.length == 0) {
        return res.status(404).json({message: 'Cannot find user'})
    }else{
        res.send(`${JSON.stringify(categoryResult[0].categories_list)}`)
    }

})


module.exports = router