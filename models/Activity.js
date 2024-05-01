// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    id: { type: String, required: true },  // Using String to store UUID
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
