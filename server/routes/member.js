const express=require("express");
const {getMemberData,addMemberData,deleteMemberData,editMemberData}=require('../controllers/member');
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware')


router.get("/memberdata",authMiddleware,getMemberData);
router.post("/addmemberdata",authMiddleware,addMemberData);
router.delete("/deletememberdata/:id",authMiddleware,deleteMemberData);
router.put("/editmemberdata/:id",authMiddleware,editMemberData);

module.exports=router;