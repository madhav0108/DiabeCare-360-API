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
        res.status(201).json(savedGlucose);
    } catch (error) {
        res.status(400).json({ message: "Failed to create glucose data", error: error.message });
    }
};

exports.getAllGlucose = async (req, res) => {
    try {
        const glucoseData = await Glucose.find();
        res.status(200).json([glucoseData]);
    } catch (error) {
        res.status(400).json({ message: "Failed to get glucose data", error: error.message });
    }
};

exports.getGlucoseById = async (req, res) => {
    try {
        const glucose = await Glucose.findOne({ id: req.params.id });
        if (glucose) {
            res.status(200).json([glucose]);
        } else {
            res.status(404).json({ message: "Glucose not found" });
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
        res.status(200).json(updatedGlucose);
    } catch (error) {
        res.status(400).json({ message: "Failed to update glucose data", error: error.message });
    }
};

exports.deleteGlucose = async (req, res) => {
    try {
        const deletedGlucose = await Glucose.findOneAndDelete({ id: req.params.id });
        res.status(200).json(deletedGlucose);
    } catch (error) {
        res.status(400).json({ message: "Failed to delete glucose data", error: error.message });
    }
};
