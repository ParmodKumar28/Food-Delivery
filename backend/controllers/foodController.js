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

export { addFood };