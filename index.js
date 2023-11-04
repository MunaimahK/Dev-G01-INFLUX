const express=require('express')
const mongoose = require('mongoose')
const userrouter = require('./router/user-router')
const app = express()
app.use(express.json())
// establish connection to mongoDB
//mongoose.connect('mongodb://localhost:27017/test-users',{
mongoose.connect('mongodb://localhost:27017/test-users',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then((res) => {
    console.log('DB Connected')
})
.catch((err) => {
    console.log(err)
})


app.use('/user', userrouter)

app.listen(3001, () => {
    console.log("Server is running")
})