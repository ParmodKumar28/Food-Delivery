import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
    
    let image = `${req.file.filename}`;
    
    const { name, description, price, category } = req.body;

    const food = new foodModel({
        name,
        description,
        price,
        image,
        category,
    });

    try {
        await food.save();
        res.status(201).json({success: true, message:"Food Added"});
    } catch (error) {
        console.log(error);
        res.status(409).json({success: false, message: error.message });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, message: error.message });
    }
};

// remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        const imagePath = `uploads/${food.image}`;
        fs.unlinkSync(imagePath);
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success: true, message: "Food Removed"});
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, message: error.message });
    }
};

export { addFood, listFood, removeFood };