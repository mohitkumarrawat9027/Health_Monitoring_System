const Member=require("../models/Member");

const getMemberData=async(req,res)=>{
    try{
        const {parentid}=req.query;
        if(parentid)
        {
         const memberData=await Member.find({parentid});
         if(memberData.length>0)
         return res.status(200).json({message:"Member Data Extracted",data:memberData});
        else
        return res.status(404).json({message:"No Members found"});
        }
        return res.status(400).json({message:"Some Error Occured"});
    }
    catch(err){
        return res.status(500).json({message:err.message,err});
       }
}

const addMemberData=async(req,res)=>{
    try{
        const{name,age,deviceId,parentid,gender}=req.body;
        if(name && age>=0 && gender && deviceId && parentid)
       {  const member=await Member.findOne({deviceId});
          if(member)
          return res.status(400).json({message:"Member already exists",member});
        const newMember=new Member({name:name,age:age,gender:gender,deviceId:deviceId,parentid:parentid});
        await newMember.save();
        return res.status(200).json({message:"Member added",member:newMember});
    }
    else
    return res.status(400).json({message:"All Paters are Mandatory"});
        
    }
    catch(err){
        return res.status(500).json({message:err.message,err});
       }
}

const editMemberData=async(req,res)=>{
    try{
        const {id}=req.params;
        const member=await Member.findByIdAndUpdate(id,req.body, { new: true });
        if(member)
        return res.status(200).json({message:"Member Successfully updated",member});
         else
         return res.status(404).json({message:"No Member Found"});
    }
    catch(err){
        return res.status(500).json({message:err.message,err});
       }
}

const deleteMemberData=async(req,res)=>{
    try{
        const {id}=req.params;
        const member=await Member.findByIdAndDelete(id);
        if(member)
        return res.status(200).json({message:"Member Successfully deleted",member});
         else
         return res.status(404).json({message:"No Member Found"});
    }
    catch(err){
        return res.status(500).json({message:err.message,err});
       }
}

module.exports={getMemberData,addMemberData,editMemberData,deleteMemberData};