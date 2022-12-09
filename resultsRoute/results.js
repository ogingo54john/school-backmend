const express = require('express');
const router = express.Router();
const resultModel = require('../Model/result')

router.get('/test', (req,res)=>{
    res.json("result test working");
})

router.post('/add',(req,res)=>{
    res.json("added routes works")

    const {userName,regNumber,packages,programming,webdesign}=req.body;

    console.log(userName,regNumber,packages,programming,webdesign)
    try {
        addedResult = new resultModel({
            userName,regNumber,packages,programming,webdesign
        })
        addedResult.save();
    } catch (error) {
        //console.log("error adding data in result collection")
        console.log(error)
       // res.json(error)
    }
   
})

//get all results
router.get('/allresults',(req,res)=>{
    resultModel.find({},function(err,doc){
       if(err){
        res.json(err)
       }else{
        res.json(doc)
       }
    });
})

module.exports = router;