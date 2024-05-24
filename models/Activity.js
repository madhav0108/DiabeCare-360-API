// models/Activity.js
const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema

const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema, 'activity');
module.exports = Activity;
