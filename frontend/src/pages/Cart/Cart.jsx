import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Image</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} className="cart-items-row cart-items-item">
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                                <p onClick={() => removeFromCart(item._id)} className="remove-button">x</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Cart;
