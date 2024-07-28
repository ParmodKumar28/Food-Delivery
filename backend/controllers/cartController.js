import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId });

        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findOneAndUpdate({_id: req.body.userId}, { cartData: cartData });
        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findOneAndUpdate({_id: req.body.userId}, { cartData: cartData });

        res.status(200).json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    } 
}

export { addToCart, removeFromCart, getCart };