import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY

const authUser = async(req,res,next)=>{
    try {
        const token = req.header("auth-token");

        if(!token)
            return res.status(401).json({
                                        success:false,
                                        message:"Token not found" 
                                    });

        const decoded = jwt.verify(token, secretKey);  //after this line is executed we get payload => that is payload is returned from the token
        
        //req.user   => req.  is compulsory and after that any name is ok
        req.user = decoded;

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Invalid token"
        })
        
    }
}

export default authUser;


//steps for middleware
//Step 1: Import jwt package
//Step 2: Secret key include the one which was used while creating token
//Step 3: create function with try catch block
//Step 4: access token passed from the frontend
//Step 5: check if the token is present or not using validation 
//Step 6: Extract the data from the token by doing =>  decoded = jwt.verify(token, secretKey)
//Step 7: req.user = decoded
//Step 8: next();
//Step 9: catch block define it
//Step 10: export the function


//If we do export const func  ==> it will export in {func}
// if we do export default func  ==> then it will export as func