// models/Medication.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema

const medicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    name: { type: String, required: true },
    dose: { type: String, required: true },
    frequency: { type: Number, required: true },
    completedIntakes: { type: Number, required: true }
});

const Medication = mongoose.model('Medication', medicationSchema, 'medication');
module.exports = Medication;
