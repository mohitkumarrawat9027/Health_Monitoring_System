const express=require("express");
const getHealthData=require('../controllers/healthdata');
const { authMiddleware } = require("../middleware/authMiddleware");
const router=express.Router();


router.get("/healthdata",authMiddleware,getHealthData);

module.exports=router;