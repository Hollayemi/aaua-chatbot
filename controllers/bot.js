const complainSchema = require("../models/complaint");
const DIALOGFLOW_API = require('../helper/dialogFlow');
const { validateComplaint } = require("../models/validation");
const byCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.chatBot = async(req, res) => {
    try {
        const { error } = validateComplaint(req.body)
        const {text} = req.body

        if(!error){
            let intentData = await DIALOGFLOW_API.detectIntent('en', text, "ajskjdkajbjkahdadka");
            const { fields } = intentData.parameters
            if (intentData.status == 1) {
                if(fields.dialog_list){
                    await complainSchema({
                        logger: req.user.userId,
                        message: text,
                        parameter: fields.dialog_list.stringValue
                    }).save()
                }
                return res.status(200).send({message: intentData.text, type: "success"});
            } else {
                return res.send('Chatbot is having problem. Try again after sometime.');
            }
        }else{
            return res.status(501).json({error:error.details[0].message, type:"error"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server error", status: "error"})
    }
}


exports.getAllComplains = async (req, res) => {
    const complains = await complainSchema.find({ status: 'pending' });
    try {
        return res.status(201).send({ data: complains, status: "success"});
    } catch (error) {
        return res.status(500).send({message:"server error", status:"error"})
    }
};

exports.updateComplains = async (req, res) => {
    try {
        await sensorNode.findOneAndUpdate({_id: req.body.id},{
            $set: {status: req.body.status}
        },
        {new:true}
        );
        const complains = await complainSchema.find({ status: 'pending' });
        return res.status(200).json({data: complains, status: "success"})
    } catch (error) {
        return res.status(500).send({message:"server error", status:"error"})
    }
};

exports.removeComplain = async (req, res) => {
    try {
        await complainSchema.findOneAndDelete({_id: req.params._id});
        const complains = await complainSchema.find({logger: req.user.userId});
        return res.status(201).send({ data: complains, status: "success"});
    } catch (error) {
        return res.status(500).send({message:"server error", status:"error"})
    }
};

exports.getComplains = async (req, res) => {
    const complains = await complainSchema.find({logger: req.user.userId});
    try {
        return res.status(201).send({ data: complains, status: "success"});
    } catch (error) {
        return res.status(500).send({message:"server error", status:"error"})
    }
};
