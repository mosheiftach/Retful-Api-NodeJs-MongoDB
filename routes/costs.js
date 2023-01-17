const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Cost = require('../models/cost')
const Categories = require('../models/categories')


//Creating cost for user while updating categories
router.post('/',  async (req, res) => {
    let userResult=[];
    let categoryResult = [];

    try {
        //Searching if user exist
        userResult = await User.find({"id": {$in: [`${req.body.costid}`]}}).exec();
        if (userResult.length == 0) {
            return res.status(404).json({message: 'Cannot find user'})
        } else {
            //if user exist saving the cost
            let newCost = new Cost({
                    id: req.body.costid,
                    description: req.body.description,
                    category: req.body.category,
                    sum: req.body.sum,
                    year: req.body.yearofcost,
                    month: req.body.monthofcost
                }
            );


            await newCost.save();
            //checking if was a cost in the specific month and year
            categoryResult = await Categories.find({
                "id": {$in: [`${req.body.costid}`]},
                "year": {$in: [`${req.body.yearofcost}`]},
                "month": {$in: [`${req.body.monthofcost}`]}
            }).exec();
            let tempKeyVal = {}
            //if cost did not find, setting a new categories for the same month and year
            if (categoryResult.length == 0) {
                tempKeyVal[`${req.body.category}`] = req.body.sum
                let newCategory = new Categories({
                    id: req.body.costid,
                    categories_list: tempKeyVal,
                    total: req.body.sum,
                    year: req.body.yearofcost,
                    month: req.body.monthofcost
                })
                await newCategory.save();
            }else{
                //if there was a spend (cost) in the same month and year the collection is updated
                if(`${req.body.category}` in categoryResult[0].categories_list){
                    let tempSum = parseInt(categoryResult[0].categories_list[`${req.body.category}`]) + parseInt(req.body.sum);
                    categoryResult[0].categories_list[`${req.body.category}`] = tempSum.toString();
                    console.log( categoryResult[0].categories_list[`${req.body.category}`])
                    console.log( categoryResult[0].categories_list)
                }else{
                    categoryResult[0].categories_list[`${req.body.category}`] = req.body.sum;
                }
                let tempSum = parseInt(categoryResult[0].total) + parseInt(req.body.sum);
                categoryResult[0].total = tempSum.toString();
                await Categories.findOneAndUpdate({
                    "id": {$in: [`${req.body.costid}`]},
                    "year": {$in: [`${req.body.yearofcost}`]},
                    "month": {$in: [`${req.body.monthofcost}`]}
                }, {total : categoryResult[0].total, categories_list:categoryResult[0].categories_list}, {
                    new: true
                });
            }
        }
    }catch (err){
        return res.status(500).json({message: err.message})

    }
    res.redirect("/costs")
})


module.exports = router