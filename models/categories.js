const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    id: String,
    year: String,
    month: String,
    categories_list: Object,
    total:String
})

module.exports= mongoose.model("Categories",categorySchema)