const mongoose=require('mongoose');

const newSchema=new mongoose.Schema({
    email:String,
    password:String
});

module.exports=mongoose.model("User",newSchema);