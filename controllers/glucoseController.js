// controllers/glucoseController.js
const Glucose = require('../models/Glucose');

exports.createGlucose = async (req, res) => {
    try {
        const glucose = new Glucose({
            id: req.body.id,
            level: req.body.level,
            date: req.body.date
        });
        const savedGlucose = await glucose.save();
        res.status(201).json([savedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to create glucose data", error: error.message });
    }
};

exports.getAllGlucose = async (req, res) => {
    try {
        const glucoseData = await Glucose.find();
        const formattedData = glucoseData.map(g => ({
            level: g.level,
            date: g.date.getTime()  // Convert date to milliseconds since the epoch
        }));
        res.status(200).json(glucoseData); // This will always be an array, even if it's empty
    } catch (error) {
        res.status(400).json({ message: "Failed to get glucose data", error: error.message });
    }
};

exports.getGlucoseById = async (req, res) => {
    try {
        const glucose = await Glucose.findOne({ id: req.params.id });
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
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json([updatedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to update glucose data", error: error.message });
    }
};

exports.deleteGlucose = async (req, res) => {
    try {
        const deletedGlucose = await Glucose.findOneAndDelete({ id: req.params.id });
        res.status(200).json([deletedGlucose]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to delete glucose data", error: error.message });
    }
};
