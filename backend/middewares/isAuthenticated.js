import jwt from "jsonwebtoken";


const isAuhtenticated = async (req , res , next)=>{
    try {
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "user not authenticatedd",
                success: false,
            });
        }
       const decode = await jwt.verify(token , process.env.SECRET_KEY);
       if(!decode){
        return res.status(401).json({
            message: "invalid",
            success:false
        })
    };


    req.id= decode.userId;
    next();


    } catch (error) {
        console.log("User not authenticatedd:", error);
      

}}


export default isAuhtenticated;