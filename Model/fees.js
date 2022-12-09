const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    userName:[{
        type:String,
        ref: "studentNew"
    }],
    amountPaid:{
        type:Number
    },
    rated:{
        type:Number
    },
    quantity:{
        type:Number
    },
    amountDue:{
        type:Number
    },
    amountExpected:{
        type:Number
    }


})

module.exports = mongoose.model("fee",feeSchema)