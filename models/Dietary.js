// models/Dietary.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema

const dietarySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Dietary = mongoose.model('Dietary', dietarySchema, 'dietary');
module.exports = Dietary;
