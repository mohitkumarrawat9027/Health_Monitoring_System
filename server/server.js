require("dotenv").config();
const mongoose=require('mongoose');
const cors=require('cors');

const express=require('express');
const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT || 5001;
const app=express();


app.use(cors({
   origin: "https://health-monitoringsystem.netlify.app",
   credentials: true
 }));

 const connect= async()=>{await mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));}

  connect();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


  
 app.use("/",require('./routes/user'));
 app.use("/",require('./routes/member'));
 app.use("/",require('./routes/healthdata'));


 app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
 });