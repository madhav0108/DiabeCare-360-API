// controllers/activityController.js
const mongoose = require('mongoose'); // Add this line to import mongoose
const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
    console.log("Received createActivity request with body:", req.body);  // Log the request body
    console.log("Authenticated user:", req.user);  // Log the authenticated user

    try {
        const activity = new Activity({
            userId: req.user.userId,  // Link glucose entry to the authenticated user
            type: req.body.type,
            duration: req.body.duration,
            caloriesBurned: req.body.caloriesBurned,
            date: new Date(req.body.date)  // Ensure date is converted to Date object
        });
        const savedActivity = await activity.save();
        res.status(201).json([savedActivity]); // Wrap in an array
    } catch (error) {
        console.error("Error in createActivity:", error);  // Log the error
        res.status(400).json({ message: "Failed to create activity data", error: error.message });
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.userId }); // Fetch data for the authenticated user
        const formattedData = activities.map(a => ({
          id: a.id.toString(),  // Convert ObjectId to string
          userId: a.userId,  // Include userId
          type: a.type,
          duration: a.duration,
          caloriesBurned: a.caloriesBurned,
          date: a.date.toISOString()
        }))
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error in getAllActivityEntries:", error);  // Log the error
        res.status(400).json({ message: "Failed to get activity data", error: error.message });
    }
};

exports.getActivityById = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const activity = await Activity.findOne({ _id: objectId, userId: req.user.userId });
        if (activity) {
            res.status(200).json([{
              id: activity.id,
              userId: activity.userId,
              type: activity.type,
              duration: activity.duration,
              caloriesBurned: activity.caloriesBurned,
              date: activity.date.toISOString()
            }]); // Wrap in an array
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        console.error("Error in getActivityById:", error);  // Log the error
        res.status(400).json({ message: "Error finding activity data", error: error.message });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: objectId, userId: req.user.userId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json([updatedActivity]); // Wrap in an array
    } catch (error) {
        console.error("Error in updateActivity:", error);  // Log the error
        res.status(400).json({ message: "Failed to update activity data", error: error.message });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const deletedActivity = await Activity.findOneAndDelete({ _id: objectId, userId: req.user.userId });
        res.status(200).json([deletedActivity]); // Wrap in an array
    } catch (error) {
        console.error("Error in deleteActivity:", error);  // Log the error
        res.status(400).json({ message: "Failed to delete activity data", error: error.message });
    }
};
