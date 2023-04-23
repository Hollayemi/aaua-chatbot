const mongoose = require('mongoose');

const complaints = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
},{timestamps: true})

module.exports = mongoose.model("admin", complaints);
