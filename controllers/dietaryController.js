// controllers/dietaryController.js
const Dietary = require('../models/Dietary');

exports.createDietary = async (req, res) => {
    try {
        const dietary = new Dietary({
            id: req.body.id,
            name: req.body.name,
            calories: req.body.calories,
            carbs: req.body.carbs,
            protein: req.body.protein,
            fat: req.body.fat,
            date: new Date(req.body.date)  // Ensure date is converted to Date object
        });
        const savedDietary = await dietary.save();
        res.status(201).json([savedDietary]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to create dietary data", error: error.message });
    }
};

exports.getAllDietaryEntries = async (req, res) => {
    try {
        const dietaryEntries = await Dietary.find();
        const formattedData = dietaryEntries.map(g => ({
          id: g.id,
          name: g.name,
          calories: g.calories,
          carbs: g.carbs,
          protein: g.protein,
          fat: g.fat,
          date: g.date.toISOString()
        }))
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).json({ message: "Failed to get dietary data", error: error.message });
    }
};

exports.getDietaryById = async (req, res) => {
    try {
        const dietary = await Dietary.findOne({ id: req.params.id });
        if (dietary) {
            res.status(200).json([dietary]); // Wrap in an array
        } else {
            res.status(404).json({ message: "Dietary entry not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error finding dietary data", error: error.message });
    }
};

exports.updateDietary = async (req, res) => {
    try {
        const updatedDietary = await Dietary.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json([updatedDietary]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to update dietary data", error: error.message });
    }
};

exports.deleteDietary = async (req, res) => {
    try {
        const deletedDietary = await Dietary.findOneAndDelete({ id: req.params.id });
        res.status(200).json([deletedDietary]); // Wrap in an array
    } catch (error) {
        res.status(400).json({ message: "Failed to delete dietary data", error: error.message });
    }
};
