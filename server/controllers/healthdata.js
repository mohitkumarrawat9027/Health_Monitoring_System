const Healthdata=require('../models/Healthdata');
const getHealthData=async(req,res)=>{
   try{
            const {deviceId}=req.query;
            if(deviceId)
             {
                const data=await Healthdata.findOne({deviceId});
                 if(data)
                 return res.status(200).json({data});
                else
                return res.status(404).json({message:"No Device Detected"});
            }
            else
            return res.status(404).json({message:"invalid Device id Detected"});         

   }
   catch(err){
    return res.status(500).json({message:err.message,err});
   }
}

module.exports=getHealthData;