require("dotenv").config();
const mongoose=require('mongoose');
const cors=require('cors');

const express=require('express');
const MONGOURI=process.env.MONGO_URI;
const PORT=process.env.PORT || 5001;
const app=express();


app.use(cors({
   origin: "https://health-monitoring-system-chi.vercel.app",
   credentials: true
 },{
   origin: "http://localhost:3000",
   credentials: true
 }));

 const connect= async()=>{await mongoose.connect(mongoURI)
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