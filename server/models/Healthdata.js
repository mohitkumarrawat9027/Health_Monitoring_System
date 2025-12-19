const mongoose=require('mongoose');

const newSchema=new mongoose.Schema({
    heartbeat:Number,
    bloodpressure:Number,
    location:String,
    deviceId:String
});

module.exports=mongoose.model("Healthdata",newSchema);