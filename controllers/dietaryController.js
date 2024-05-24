// controllers/dietaryController.js
const Dietary = require('../models/Dietary');

exports.createDietary = async (req, res) => {
    console.log("Received createGlucose request with body:", req.body);  // Log the request body
    console.log("Authenticated user:", req.user);  // Log the authenticated user

    try {
        const dietary = new Dietary({
            userId: req.user.userId,  // Link glucose entry to the authenticated user
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
        console.error("Error in createDietary:", error);  // Log the error
        res.status(400).json({ message: "Failed to create dietary data", error: error.message });
    }
};

exports.getAllDietaryEntries = async (req, res) => {
    try {
        const dietaryEntries = await Dietary.find({ userId: req.user.userId }); // Fetch data for the authenticated user
        const formattedData = dietaryEntries.map(d => ({
          id: d._id.toString(),  // Convert ObjectId to string
          userId: d.userId,  // Include userId
          name: d.name,
          calories: d.calories,
          carbs: d.carbs,
          protein: d.protein,
          fat: d.fat,
          date: d.date.toISOString()
        }))
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error in getAllDietaryEntries:", error);  // Log the error
        res.status(400).json({ message: "Failed to get dietary data", error: error.message });
    }
};

exports.getDietaryById = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const dietary = await Dietary.findOne({ _id: objectId, userId: req.user.userId });
        if (dietary) {
            res.status(200).json([{
              id: dietary._id,
              userId: dietary.userId,
              name: dietary.name,
              calories: dietary.calories,
              carbs: dietary.carbs,
              protein: dietary.protein,
              fat: dietary.fat,
              date: dietary.date.toISOString()
            }]); // Wrap in an array
        } else {
            res.status(404).json({ message: "Dietary entry not found" });
        }
    } catch (error) {
        console.error("Error in getDietaryById:", error);  // Log the error
        res.status(400).json({ message: "Error finding dietary data", error: error.message });
    }
};

exports.updateDietary = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const updatedDietary = await Dietary.findOneAndUpdate(
            { _id: objectId, userId: req.user.userId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json([updatedDietary]); // Wrap in an array
    } catch (error)
        console.error("Error in updateDietary:", error);  // Log the error
        res.status(400).json({ message: "Failed to update dietary data", error: error.message });
    }
};

exports.deleteDietary = async (req, res) => {
    try {
        // Convert the string ID to a MongoDB ObjectId
        const objectId = mongoose.Types.ObjectId(req.params.id);
        const deletedDietary = await Dietary.findOneAndDelete({ _id: objectId, userId: req.user.userId });
        res.status(200).json([deletedDietary]); // Wrap in an array
    } catch (error) {
        console.error("Error in deleteGlucose:", error);  // Log the error
        res.status(400).json({ message: "Failed to delete dietary data", error: error.message });
    }
};
