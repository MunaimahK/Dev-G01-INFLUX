const express =require('express')
const router = express.Router()
const usermodel = require("../models/user-models")
const { Model } = require('mongoose')


router.post('/post', async(req, res) => {
    try{
        var data = new usermodel({
            name:(req.body).name,
            username:(req.body).username,
            email:(req.body).email,
            ucfid: (req.body).ucfid,
            gender: (req.body).gender,
            paidDues: (req.body).paidDues,
            isAdmin: (req.body).isAdmin,
            custom: (req.body).custom
        })
        //const dataToSave = data.save();
        data.save()
      //  console.log(data)
        res.status(200).json({
            "message":"Succesfully Inserted Tuple"
        })
    } catch{
        res.status(500).json({
            "message":" Tuple could not be inserted "
        })
    }
})

router.get('/getAll', async(req, res) => {
    try{
        const allusers = await usermodel.find()
      //  console.log(allusers)
        res.status(200).json(allusers)
    } catch{
        res.status(500).json({
            "message":" Tuple could not be inserted "
        })
    }
})

module.exports = router
