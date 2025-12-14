const jwt=require('jsonwebtoken');


const authMiddleware=async(req,res,next)=>{
    try{
    const authheader=req.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer '))
    return res.status(400).json({message:"No token Found"});
   const token=authheader.split(' ')[1].trim();
   const decoded=jwt.verify(token,process.env.JWT_SECRET);
   req.user=decoded;
  next();  
}
catch(err){
    return res.status(401).json({message:"Invalid Token"});
}
}

module.exports={authMiddleware};