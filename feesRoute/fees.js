const express =require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const feeModel = require('../Model/fees')
const studentModel = require('../studentSchema')

router.get('/test', (req,res)=>{
    res.json('invoice works');
    //uuidv4();
    //console.log(uuidv4())
})

router.post('/add',(req,res)=>{
    const {userName, amountPaid, rated,quantity}= req.body;
    //console.log(userName,amountPaid,amountExpected,quantity);
    const amountExpected = quantity*rated;
    const amountDue = amountExpected - amountPaid;
    console.log(amountDue)


    try {
        let invoice = new feeModel({userName,amountPaid,rated,quantity,amountDue,amountExpected});

  invoice
    .save()
    .then(instructor => {
     // res.status(200).json({ instructor: "instructor added successfully" });
     res.status(200).json(invoice);
    })

    } catch (error) {
        console.log(error)
    }




})

// get all fees
router.get("/allfees",(req,res)=>{
    feeModel.find({},(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
// get singe item

router.get("/:id", (req,res)=>{
    let id = req.params.id;
    feeModel.findById(id, function(err,data){
        if(err){
            console.log(err)
            res.jsoon(err)
        }else{
            console.log(data);
            res.json(data);
        }
    })
})

router.post("/update/:id", (req,res)=>{
   // res.json("this route works")
   console.log(req.params.id);
   feeModel.findById(req.params.id, (err, feeData)=>{
        if(!feeData){
             res.sendStatus(404)
             //.send("data not found");
             console.log("data not found")
                }
        else {
            feeData.userName = req.body.username;
            feeData.amountPaid = req.body.amountPaid;
            feeData.rated = req.body.rated;
            feeData.quantity = req.body.quantity;

            feeData
                .save()
                .then(feeData =>{
                    console.log("fee updated")
                })
                .catch(err=>{
                    console.log(err)
                });
        }
   })
})

router.delete("/delete/:id", (req,res)=>{
    feeModel.findOneAndDelete({_id:req.params.id}, function(err,data)
        {
            try {
                if(!data){
                    console.log("no data")
                    res.json("user doesn't exist")
            }else{
                console.log("deleted successful")
                res.json("deleted successfully")
            }
            } catch (error) {
                console.log(error)
                res.json(error)
            }
    }
    )
})

module.exports = router;