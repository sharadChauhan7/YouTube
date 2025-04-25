import jwt from 'jsonwebtoken';
export const isLogin = async (req,res,next)=>{
    console.log("isLogin triggered");

    try{
        const {authToken} = req.body;
        if(!authToken){
            return res.status(400).send("User is not logged in");
                
        }
        const result =  jwt.verify(authToken,'meninblack');
        console.log(result);
        const {user}  = result;
        console.log("User Loged in");
           console.log(user);
           req.user = user;
        next();
    }
    catch(e){
        res.status(400).send("User is not logged in");
    }
}