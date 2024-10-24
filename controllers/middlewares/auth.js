
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req, res, next)=>{

    try{
        //fetch data
        const token = req.body.token;
        //
        if(!token){
            res.status(401).json({
                success: false,
                message: "token missing"

            })
        }
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        user.req = decode;
        }
        catch(err){
            res.status(401).json({
                success:false,
                message: "token is invalid"
            });

        }
        
        next();

    }
    catch(err){

        res.status(400).json({
            success:false,
            message:"something went wrong, while verifyinng the token"
        });

    }
}

exports.isstudent = async(req, res, next)=>{

    try{

        if(user.req.role != "student"){
           return res.status(401).json({
                success:false,
                meassage: "this is protected route for students"
            });
        }

        next();

    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "user role is not matching",
        })

    }
}

exports.isadmin = async(req, res, next)=>{

    try{

        if(user.req.role != "admin"){
           return res.status(401).json({
                success:false,
                meassage: "this is protected route for admin"
            });
        }

        next();

    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "user role is not matching",
        })

    }
}