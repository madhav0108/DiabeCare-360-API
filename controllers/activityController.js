// controllers/activityController.js
const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
    try {
        const activity = new Activity({
            id: req.body.id,
            type: req.body.type,
            duration: req.body.duration,
            caloriesBurned: req.body.caloriesBurned,
            date: req.body.date
        });
        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(400).json({ message: "Failed to create activity data", error: error.message });
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ message: "Failed to get activity data", error: error.message });
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findOne({ id: req.params.id });
        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error finding activity data", error: error.message });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(400).json({ message: "Failed to update activity data", error: error.message });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const deletedActivity = await Activity.findOneAndDelete({ id: req.params.id });
        res.status(200).json(deletedActivity);
    } catch (error) {
        res.status(400).json({ message: "Failed to delete activity data", error: error.message });
    }
};
