const mongoose = require('mongoose')


const costSchema = new mongoose.Schema({
    id: String,
    description:String,
    category:String,
    sum:String,
    year:String,
    month:String
})

module.exports= mongoose.model("costs",costSchema)