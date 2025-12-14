const mongoose=require('mongoose');

const newSchema=new mongoose.Schema({
    name:String,
    age:Number,
    parentid:String,
    deviceId:String,
    gender:String
});

module.exports=mongoose.model("Member",newSchema);