const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    matricNo: {type: String},
    token: {type: String},
},{timestamps: true})

module.exports = mongoose.model("users", Users);
