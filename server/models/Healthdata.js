const mongoose=require('mongoose');

const newSchema=new mongoose.Schema({
    heartbeat:Number,
    bloodpressure:Number,
    deviceId:String
});

module.exports=mongoose.model("Healthdata",newSchema);