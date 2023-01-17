const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    birthday: String,
    marital_status: String
})

module.exports= mongoose.model("Users",userSchema)