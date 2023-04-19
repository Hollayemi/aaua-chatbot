const mongoose = require('mongoose');

const complaints = new mongoose.Schema({
    logger: {type: String, required: true},
    message: {type: String, required: true},
    parameter: {type: String, required: true},
    ictacStaff: {type: String},
    status: {type: String, default: "pending"},
    token: {type: String},
},{timestamps: true})

module.exports = mongoose.model("logs", complaints);
