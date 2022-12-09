const express =  require("express")
const router = express.Router() 
const Adminmodel = require("../AdminSchema/adminSchema")
const nodemailer = require("nodemailer");
const mongoose=require('mongoose');
const bcrypt = require("bcrypt");


const checkAuth=require("../../auth/checkAuthAdmin");

const jwt=require('jsonwebtoken');
const keys=require('../../config/key.json');
const JWT_KEY=keys.JWT_KEY;


//----------------------------------------------ADMIN RETRIEW ALL -------------
router.get("/admin/edit",(req,res) => { 
    Adminmodel.find((err,admin) =>{
       if(err) {
           console.log(err)
       }
       else {
           res.json(admin)
       }
          
       })
   
 })
//--------------------------------------------------------------------------
 router.get("/admin/edit/:id" ,(req,res) => { 
    let id = req.params.id;
    Adminmodel.findById(id,(err,admin) =>{
          res.json(admin)
    })
   
 })

//  router.post("/admin/add", async (req,res)=>{
//     const  {adminID,name,email,password}=req.body;

//     let existingAdministator = Adminmodel.findOne({adminID})

//     if (existingAdministator){
//         res.status(200).json("admin already exists here")
//     }else{
//         const salt = await bcrypt.genSalt(10);
//         console.log("salt:", salt);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         console.log("hashed password:", hashedPassword); 
//     }
      
//  })

//-----------------------------LOGIN--------------------

  //login
router.post("/admin/login",(req,res)=>{
    //console.log(req.body.adminID)
    Adminmodel.find({adminID:req.body.adminID})
    .exec()
    .then(admin=>{
        console.log(admin)
        if(admin.length<1){
            return res.status(401).json({
                message:'Authorization Failed!'
            });
        }
        if(admin){
           //correct password
            const token=jwt.sign({
                   id:admin[0]._id,
                   adminID:admin[0].adminID,
                   userType:admin[0].userType

            },
            JWT_KEY,
            {
                 expiresIn: "1h"
            }
            );
            console.log(admin);
             return res.status(200).json({
                message:'Authorization Success',
                token:token
             });
        }
        res.status(401).json({
            message:'Authorization Failed!'
        });
    }).catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    });
})

});



//------------------------------------ADMIN UPDATE-------------------------------
router.post("/admin/update/:id",(req,res) =>{
    Adminmodel.findById(req.params.id,(err,admin) => {
        if(!admin){
            res.status(404).send("data is not found");
        }
        else{
            admin.adminID = req.body.adminID,
            admin.name = req.body.name;
            admin.mail = req.body.email;
            admin.password= req.body.password;

            admin.save().then( (admin) =>{
                res.json("admin updated")
             }).catch( (err) =>{
                 res.status(400).send("updated not succesful")
             })
        }
    })
})

router.delete("/admin/delete/:id",(req,res) => {
    Adminmodel.findOneAndDelete({_id:req.params.id},(err,admin)=>{
       if(err) {
           res.json(err);
       } 
       else{
           res.json("deleted successfully");
       }
    })
})


// router.put("/admin/rtt", (req,res) =>{
//     res.send({ type: "put"})
// })


// router.delete("/admin/de" ,(req,res) => {
//     res.send({ type: "delete"})
// })

module.exports = router;