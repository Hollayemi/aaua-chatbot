const adminController = require("../models/admin");
const { adminValidation } = require("../models/validation");
const byCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createAdmin = async(req, res) => {
    // hashPassword 
    const lvlup = await byCrypt.genSalt(10);
    const hashedPass = await byCrypt.hash(req.body.password, lvlup)

    const { error } = adminValidation(req.body);
    const exists = await adminController.findOne({email: req.body.email})    
    const userAccount = adminController({...req.body, password: hashedPass});

    try {
        if(!error){
            if(!exists){
                const saveInfo = await userAccount.save()
                console.log(saveInfo)
                return res.status(201).json({ data: saveInfo, message: 'Account created succesfully', status: "success"})
            }else{
                return res.status(406).json({message: 'Admin already exist ', status: "error"})
            }
        }else{
            return res.status(501).json({message:error.details[0].message, type:"error"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error, status: "error"})
    }
}



exports.AdminLogin = async (req, res) => {
    const userInfo = await adminController.findOne({email:  req.body.email});
    try {
        
        if(!userInfo){
            return res.status(501).send({message:"Invalid email or password!", status: "error"});
        }else{            
            const validPass = await byCrypt.compare(req.body.password, userInfo.password);    
            if(!validPass) {
                return res.status(501).send({message:"Invalid credentials!", status: "error"});
            }else{
                const accessToken = jwt.sign(
                    {
                        userId: userInfo._id,
                        name: userInfo._doc.name
                    },
                    process.env.JWT_USER_TOKEN,
                    {expiresIn:"60h"}
                )
                const {password, ...otherDetails} = userInfo._doc;
                return res.status(201).send({ data:{...otherDetails, accessToken}, message:'Welcome Back', status: "success"});
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"server error", status:"error"})
    }
};
