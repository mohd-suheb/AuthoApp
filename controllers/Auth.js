const bycrpt = require('bcrypt');
const Userdata = require('../models/Userdata');
const { sign } = require('jsonwebtoken');

//signup routehandler
exports.signup = async(req, res)=>{

    try {
        //get data
        const{name, email, password, role} = req.body;
        //check if user already exist
        const extingulsar = await Userdata.findOne({email});

        if(extingulsar){
            return res.status(400).json({
                suceess: false,
                message: "userdata already exits"
            });
        }

        //sceurred password
        let hashpassword;
        try {

            hashpassword = await bycrpt.hash(password, 10);
            
        } catch (error) {

            return res.status(500).json({
                success: true,
                message: "error in hashing password"
            })
            
        }
        //insert data into data base
        const Userdata = await Userdata.create({
            name, email, password:hashpassword, role,
        });

        res.status(200).json({
            success:true,
            message: "user created sucessfully",
        })
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message: "user can not be registerd sucessfuly pleae try again latre",
        })
        
    }
}


//login
exports.login = async(req, res)=>{

    try{

        //fetch data from req body
        const{email, password} = req.body;
        //check email and password 
        if(!email || !password){

            return res.status(400).json({
                success: false,
                message: "please fill all the details"
            });

        }
        //if registed
        const user = await Userdata.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                meassage: "user is not register"
            });
        }
        const payload = {
            email: user.email,
            id:user._id,
            role:user.role,
        }

        require("dotenv").config();
        //verify password and generate token
        if(await bycrpt.compare(password, user.password)){
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresin: "2h",
            });

            user.token = token,
            user.password = undefined

            const option = {
                expires: new Date(Date.now()+2*24*24*60*60*1000),
                httponly: true,
            }

            res.cookie("token", token, option).json({

                success:true,
                token,
                user,
                message:"user logged in successfully"

            })

        }
        else{
            //password do not match
            return res.status(403).json({
                success:false,
                message: "password incorect"
            });
        }

    }
    catch(err){

    }
}