import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const loadData = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            const result = await axios.post("http://localhost:5000/api/myOrderData", {
                email: userEmail,
            });

            if (result.data && Array.isArray(result.data.order_data)) {
                // Map and sort orderData by date in descending order
                const sortedOrderData = result.data.order_data
                    .map(orderGroup => {
                        if (Array.isArray(orderGroup) && orderGroup.length >= 2) {
                            return orderGroup;
                        } else {
                            console.error("Invalid order group format:", orderGroup);
                            return null;
                        }
                    })
                    .filter(orderGroup => orderGroup !== null) // Remove invalid order groups
                    .sort((a, b) => {
                        // Extract dates and convert to Date objects for comparison
                        const dateA = new Date(a[0]?.order_date);
                        const dateB = new Date(b[0]?.order_date);

                        // Ensure valid dates
                        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                            console.error("Invalid date format:", a[0]?.order_date, b[0]?.order_date);
                            return 0;
                        }

                        // Sort in descending order
                        return dateB - dateA;
                    });

                setOrderData(sortedOrderData);
            } else {
                console.error("Unexpected data structure:", result.data);
                setOrderData([]); // Clear data on error
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            setOrderData([]); // Clear data on error
        }
    };

    useEffect(() => {
        loadData();
    }, []);
   

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData.length > 0 ? (
                        orderData.map((orderGroup, index) => {
                            if (!Array.isArray(orderGroup) || orderGroup.length < 2) {
                                console.error("Invalid order group format:", orderGroup);
                                return <p key={index}>Invalid order group format</p>;
                            }

                            // Destructure orderGroup
                            const [orderDate, ...items] = orderGroup;
                            const totalPrice = items.reduce((sum, item) => {
                                return sum + (item.price || 0);
                            }, 0);

                            if (orderDate && orderDate.order_date) {
                                const formattedDate = new Date(orderDate.order_date).toLocaleString();

                                return (
                                    <div key={index} className="row col-12">
                                        <div className="row m-auto mt-5">
                                            <h3>{formattedDate}</h3>
                                            <hr />
                                            {items.length > 0 ? (
                                                items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                                                        <div
                                                            className="card mt-3 col-12 col-md-6 col-lg-3"
                                                            style={{ width: "16rem", maxHeight: "360px" }}
                                                        >
                                                            <img
                                                                src={item.img || 'default-image.png'}
                                                                className="card-img-top"
                                                                alt={item.name || 'item image'}
                                                                style={{ height: "120px", objectFit: "fill" }}
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">
                                                                    {item.name || 'Unknown Item'}
                                                                </h5>
                                                                <div
                                                                    className="container w-100 p-0"
                                                                    style={{ height: "38px" }}
                                                                >
                                                                    <span className="m-1">{item.qty || 0}{"x"}</span>
                                                                    <span className="m-1">{item.size || 'N/A'}</span>
                                                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                        ₹{item.price || 0}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No items available</p>
                                            )}
                                              <div className="mt-3">
                                                <h4>Total Price: ₹{totalPrice}</h4>
                                            </div>
                                            <hr/>
                                        </div>
                                    </div>
                                );
                            } else {
                                console.error("Order date is missing:", orderDate);
                                return <p key={index}>Order date missing</p>;
                            }
                        })
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}