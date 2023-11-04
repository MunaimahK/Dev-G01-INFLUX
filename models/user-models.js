const mongoose = require('mongoose')
const User = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    ucfid: String,
    gender:String,
    paidDues: Boolean,
    isAdmin: Boolean,
    custom: String
})

const usermodel = mongoose.model("User", User)
module.exports = usermodel