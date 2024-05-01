// models/Medication.js
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    id: { type: String, required: true },  // Using String to store UUID
    name: { type: String, required: true },
    dose: { type: String, required: true },
    frequency: { type: Number, required: true },
    completedIntakes: { type: Number, required: true }
});

module.exports = mongoose.model('Medication', medicationSchema);
