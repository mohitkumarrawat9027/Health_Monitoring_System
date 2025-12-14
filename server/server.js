require("dotenv").config();
const mongoose=require('mongoose');
const cors=require('cors');

const express=require('express');
const MONGOURI=process.env.MONGO_URI;
const PORT=process.env.PORT || 5001;
const app=express();

app.use(cors({
   origin: "http://localhost:3000",
   credentials: true
 },{
   origin: "http://localhost:3000",
   credentials: true
 }));
 
app.use(express.json());

mongoose.connect(MONGOURI)
 .then(()=>console.log("mongodb connected"))
 .catch(err=>console.log(err.message));

 app.use("/",require('./routes/user'));
 app.use("/",require('./routes/member'));
 app.use("/",require('./routes/healthdata'));


 app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
 });