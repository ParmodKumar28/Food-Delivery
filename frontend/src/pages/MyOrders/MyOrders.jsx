import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([
        // {
        //     items: [
        //         { name: 'Pizza', quantity: 2 },
        //         { name: 'Burger', quantity: 1 }
        //     ],
        //     amount: 30,
        //     status: 'Delivered'
        // },
        // {
        //     items: [
        //         { name: 'Sushi', quantity: 3 },
        //         { name: 'Ramen', quantity: 2 }
        //     ],
        //     amount: 50,
        //     status: 'In Progress'
        // }
    ]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            console.log("Response data:", response.data.orders);
            setData(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data?.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order?.items?.map((item, index) => {
                            if (index === order.items.length - 1) {
                                return `${item.name} x ${item.quantity}`;
                            } else {
                                return `${item.name} x ${item.quantity}, `;
                            }
                        })}</p>
                        <p>${order?.amount}.00</p>
                        <p>Items: {order?.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order?.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders