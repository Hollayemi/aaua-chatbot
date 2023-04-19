const parkingField = require("../models/parkingField");
const sensorNode = require("../models/sensorNode");
const { validateSensorNode } = require("../models/validation");
const { getLotDevicesPipeLine } = require("./pipeline");

exports.addSensorNode = async(req, res) => {
    const { error } = validateSensorNode(req.body);
    const exists = await sensorNode.findOne({serialNumber: req.body.serialNumber})    
    try {
        if(!error){
            if(!exists) {
                const saveInfo = await sensorNode(req.body);
                saveInfo && saveInfo.save()
                const myDevices = await sensorNode.aggregate(getLotDevicesPipeLine(req.user.userId));
                console.log(myDevices, "jhkjkjkj");
                return res.status(201).json({ data: myDevices,  message: 'New Device added', status: "success"})
            }else{
                return res.status(501).json({message: 'Device with this ip address already used', status: "error"})
            }
        }else{
            return res.status(501).json({message:error.details[0].message, type:"error"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'unable to add device', status: "error"})
    }
}


// update sensor node
exports.updateSensorNode = async(req, res) => {
    console.log(req.body)
    try {
        await sensorNode.findOneAndUpdate({serialNumber: req.body.serialNumber},{
                $set: {freeSpaces: req.body.newStatus}
            },
            {new:true}
        );
        return res.status(200).json({message: 'updated', status: "success"})
    } catch (error) {
        return res.status(500).json({message: 'unable to update node', status: "error"})
    }
}



exports.getSensorNode = async(req, res) => {
    try {
        const myDevices = await sensorNode.aggregate(getLotDevicesPipeLine(req.user.userId));
        return res.status(200).json({data: myDevices, status: "success"})
    } catch (error) {
        return res.status(500).json({message: 'unable to update node', status: "error"})
    }
}

// update sensor node
exports.deleteSensorNode = async(req, res) => {
    console.log(req.body)
    try {
        const saveInfo = await sensorNode.findByIdAndDelete(req.params.id);
        return res.status(200).json({ data: saveInfo, message: 'deleted', status: "success"})
    } catch (error) {
        return res.status(500).json({message: 'unable to delete node', status: "error"})
    }
}