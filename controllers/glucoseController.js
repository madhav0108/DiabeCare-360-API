// controllers/glucoseController.js
const Glucose = require('../models/Glucose');

exports.createGlucose = async (req, res) => {
    try {
        const glucose = new Glucose({
            userId: req.user._id,  // Link glucose entry to the authenticated user
            level: req.body.level,
            date: new Date(req.body.date)  // Ensure date is converted to Date object
        });
        const savedGlucose = await glucose.save();
        res.status(201).json([savedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to create glucose data", error: error.message });
    }
};

exports.getAllGlucose = async (req, res) => {
    try {
        const glucoseData = await Glucose.find({ userId: req.user._id }); // Fetch data for the authenticated user
        const formattedData = glucoseData.map(g => ({
            level: g.level,
            date: g.date.toISOString()
        }));
        res.status(200).json(formattedData);  // Send formatted data
    } catch (error) {
        res.status(400).json({ message: "Failed to get glucose data", error: error.message });
    }
};

exports.getGlucoseById = async (req, res) => {
    try {
        const glucose = await Glucose.findOne({ _id: req.params.id, userId: req.user._id });  // Ensure the glucose entry belongs to the authenticated user
        if (glucose) {
            res.status(200).json([glucose]); // Wrap in an array
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        res.status(400).json({ message: "Error finding glucose data", error: error.message });
    }
};

exports.updateGlucose = async (req, res) => {
    try {
        const updatedGlucose = await Glucose.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },  // Ensure the glucose entry belongs to the authenticated user
            { $set: { level: req.body.level, date: new Date(req.body.date) } },
            { new: true }
        );
        res.status(200).json([updatedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to update glucose data", error: error.message });
    }
};

exports.deleteGlucose = async (req, res) => {
    try {
        const deletedGlucose = await Glucose.findOneAndDelete({ _id: req.params.id, userId: req.user._id });  // Ensure the glucose entry belongs to the authenticated user
        res.status(200).json([deletedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to delete glucose data", error: error.message });
    }
};
