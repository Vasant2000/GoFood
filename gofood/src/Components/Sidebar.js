import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import './Sidebar.css'; // Ensure you have the correct path to the CSS file

const Sidebar = ({ isOpen, onClose, openCartModal }) => {
  const cart = useCart();
  const dispatch = useDispatchCart();

  if (cart.length === 0) return null; // Hide the sidebar if no items

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn text-danger" onClick={onClose}>X</button>
      <h2 className="text-black ">Cart Items</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="text-warning">
            {item.name} - {item.qty} x ₹{item.price.toFixed(2)}
            <button
              className="remove-btn"
              onClick={() => dispatch({ type: "REMOVE", index })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {/* Button to open the cart modal */}
      <button className="open-cart-btn  mt-3 text-success" onClick={openCartModal}>View Cart</button>
    </div>
  );
};

export default Sidebar;
