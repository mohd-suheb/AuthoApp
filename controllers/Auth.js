const bycrpt = require('bcrypt');
const Userdata = require('../models/Userdata');

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