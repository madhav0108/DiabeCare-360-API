// controllers/medicationController.js
const mongoose = require('mongoose'); // Add this line to import mongoose
const Medication = require('../models/Medication');

exports.createMedication = async (req, res) => {
    console.log("Received createMedication request with body:", req.body);  // Log the request body
    console.log("Authenticated user:", req.user);  // Log the authenticated user

    try {
        const medication = new Medication({
            userId: req.user.userId,  // Link glucose entry to the authenticated user
            name: req.body.name,
            dose: req.body.dose,
            frequency: req.body.frequency,
            completedIntakes: req.body.completedIntakes
        });
        const savedMedication = await medication.save();
        res.status(201).json([savedMedication]); // Wrap in an array
    } catch (error) {
        console.error("Error in createMedication:", error);  // Log the error
        res.status(400).json({ message: "Failed to create medication data", error: error.message });
    }
};

exports.getAllMedications = async (req, res) => {
    try {
        const medications = await Medication.find({ userId: req.user.userId }); // Fetch data for the authenticated user
        const formattedData = medications.map(m => ({
          id: m._id.toString(),
          userId: m.userId,
          name: m.name,
          dose: m.dose,
          frequency: m.frequency,
          completedIntakes: m.completedIntakes
        }))
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error in getAllMedications:", error);  // Log the error
        res.status(400).json({ message: "Failed to get medication data", error: error.message });
    }
};

exports.getMedicationById = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const medication = await Medication.findOne({ _id: objectId, userId: req.user.userId });
        if (medication) {
            res.status(200).json([{
              id: medication._id,
              userId: medication.userId,
              name: medication.name,
              dose: medication.dose,
              frequency: medication.frequency,
              completedIntakes: medication.completedIntakes
            }]); // Wrap in an array
        } else {
            res.status(404).json({ message: "Medication not found" });
        }
    } catch (error) {
        console.error("Error in getMedicationById:", error);  // Log the error
        res.status(400).json({ message: "Error finding medication data", error: error.message });
    }
};

exports.updateMedication = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const updatedMedication = await Medication.findOneAndUpdate(
            { _id: objectId, userId: req.user.userId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json([updatedMedication]); // Wrap in an array
    } catch (error) {
        console.error("Error in updateMedication:", error);  // Log the error
        res.status(400).json({ message: "Failed to update medication data", error: error.message });
    }
};

exports.deleteMedication = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const deletedMedication = await Medication.findOneAndDelete({ _id: objectId, userId: req.user.userId });
        res.status(200).json([deletedMedication]); // Wrap in an array
    } catch (error) {
        console.error("Error in deleteGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to delete medication data", error: error.message });
    }
};
