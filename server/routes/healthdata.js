const express=require("express");
const {getHealthData,postHealthData}=require('../controllers/healthdata');
const { authMiddleware } = require("../middleware/authMiddleware");
const router=express.Router();


router.get("/healthdata",authMiddleware,getHealthData);
router.post("/healthdata",authMiddleware,postHealthData);

module.exports=router;