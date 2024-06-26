// controllers/glucoseController.js
const mongoose = require('mongoose'); // Add this line to import mongoose
const Glucose = require('../models/Glucose');

exports.createGlucose = async (req, res) => {
    console.log("Received createGlucose request with body:", req.body);  // Log the request body
    console.log("Authenticated user:", req.user);  // Log the authenticated user

    try {
        const glucose = new Glucose({
            userId: req.user.userId,  // Link glucose entry to the authenticated user
            level: req.body.level,
            date: new Date(req.body.date)  // Ensure date is converted to Date object
        });
        const savedGlucose = await glucose.save();
        res.status(201).json([savedGlucose]); // Wrap in an array
    } catch (error) {
        console.error("Error in createGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to create glucose data", error: error.message });
    }
};

exports.getAllGlucose = async (req, res) => {
    try {
        const glucoseData = await Glucose.find({ userId: req.user.userId }); // Fetch data for the authenticated user
        const formattedData = glucoseData.map(g => ({
            id: g._id.toString(),  // Convert ObjectId to string
            userId: g.userId,  // Include userId
            level: g.level,
            date: g.date.toISOString()
        }));
        res.status(200).json(formattedData);  // Send formatted data
    } catch (error) {
        console.error("Error in getAllGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to get glucose data", error: error.message });
    }
};

exports.getGlucoseById = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const glucose = await Glucose.findOne({ _id: objectId, userId: req.user.userId });
        if (glucose) {
            res.status(200).json([{
                id: glucose._id,
                userId: glucose.userId,
                level: glucose.level,
                date: glucose.date.toISOString()
            }]);  // Wrap in an array
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        console.error("Error in getGlucoseById:", error);  // Log the error
        res.status(400).json({ message: "Error finding glucose data", error: error.message });
    }
};

exports.updateGlucose = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const updatedGlucose = await Glucose.findOneAndUpdate(
            { _id: objectId, userId: req.user.userId },
            { $set: { level: req.body.level, date: new Date(req.body.date) } },
            { new: true }
        );
        res.status(200).json([updatedGlucose]); // Wrap in an array
    } catch (error) {
        console.error("Error in updateGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to update glucose data", error: error.message });
    }
};

exports.deleteGlucose = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const deletedGlucose = await Glucose.findOneAndDelete({ _id: objectId, userId: req.user.userId });
        res.status(200).json([deletedGlucose]); // Wrap in an array
    } catch (error) {
        console.error("Error in deleteGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to delete glucose data", error: error.message });
    }
};
