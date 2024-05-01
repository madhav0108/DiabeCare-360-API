// controllers/medicationController.js
const Medication = require('../models/Medication');

exports.createMedication = async (req, res) => {
    try {
        const medication = new Medication({
            id: req.body.id,
            name: req.body.name,
            dose: req.body.dose,
            frequency: req.body.frequency,
            completedIntakes: req.body.completedIntakes
        });
        const savedMedication = await medication.save();
        res.status(201).json(savedMedication);
    } catch (error) {
        res.status(400).json({ message: "Failed to create medication data", error: error.message });
    }
};

exports.getAllMedications = async (req, res) => {
    try {
        const medications = await Medication.find();
        res.status(200).json(medications);
    } catch (error) {
        res.status(400).json({ message: "Failed to get medication data", error: error.message });
    }
};

exports.getMedicationById = async (req, res) => {
    try {
        const medication = await Medication.findOne({ id: req.params.id });
        if (medication) {
            res.status(200).json(medication);
        } else {
            res.status(404).json({ message: "Medication not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error finding medication data", error: error.message });
    }
};

exports.updateMedication = async (req, res) => {
    try {
        const updatedMedication = await Medication.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedMedication);
    } catch (error) {
        res.status(400).json({ message: "Failed to update medication data", error: error.message });
    }
};

exports.deleteMedication = async (req, res) => {
    try {
        const deletedMedication = await Medication.findOneAndDelete({ id: req.params.id });
        res.status(200).json(deletedMedication);
    } catch (error) {
        res.status(400).json({ message: "Failed to delete medication data", error: error.message });
    }
};
