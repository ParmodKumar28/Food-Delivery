import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    const { id, name, price, image } = req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.cartData[name] = { price, image };
        await user.save();
        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    const { id, name } = req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        delete user.cartData[name];
        await user.save();
        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user.cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    } 
}

export { addToCart, removeFromCart, getCart };