import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
    const { name, description, price, image, category } = req.body;

    const newFoodItem = new foodModel({
        name,
        description,
        price,
        image,
        category,
    });

    try {
        await newFoodItem.save();
        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export { addFood };