const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    userName:{
        type:String
    },
    regNumber:{
        type:String
    },
    Packages:{
        type:String
    },
    programming:{
        type:String
    },
    webdesign:{
        type:String
    }


})

module.exports = mongoose.model("result",resultSchema)