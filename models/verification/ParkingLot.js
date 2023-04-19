const mongoose = require('mongoose');

const parkingField = new mongoose.Schema({
    lotName: {type: String, required: true},
    userId: {type: String, required: true},
    numberOfColumns: {type: Number, required: true},
    slotPerColumns: {type: String, required: true},
    coordinates: {type: Object, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    addresss: {type: String, required: true},
},{timestamps: true})

module.exports = mongoose.model("parkingField", parkingField);
