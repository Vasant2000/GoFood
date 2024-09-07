import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import axios from "axios";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The TestCart Is Empty!</div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let now = new Date();
    let date = now.toLocaleString();
    let userEmail = localStorage.getItem("userEmail");
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    try {
      let response = await axios.post("http://localhost:5000/api/payment", {
        totalPrice,
      });
      console.log("post payment call")

      const options = {
        key: "rzp_test_VgiFlNXXFUrFOG",
        amount: totalPrice * 100, // Razorpay expects the amount in paise
        currency: "INR",
        name: "TestCart Corp",
        order_id: response.data.id, // Order ID from the server response
        callback_url: "http://localhost:5000/api/payVer",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9619044217",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      console.log("post open")

      // Save order data after payment is initiated
      await axios.post("http://localhost:5000/api/orderData", {
        userEmail,
        data,
        date,
        totalPrice,
      });

      // Clear cart after successful order
      dispatch({ type: "DROP" });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-info fs-4">
            <tr className="container">
              <th className="text-warning" scope="col">
                #
              </th>
              <th className="text-warning" scope="col">
                Name
              </th>
              <th className="text-warning" scope="col">
                Quantity
              </th>
              <th className="text-warning" scope="col">
                Option
              </th>
              <th className="text-warning" scope="col">
                Amount
              </th>
              <th className="text-warning" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th className="text-warning" scope="row">
                  {index + 1}
                </th>
                <td className="text-warning">{food.name}</td>
                <td className="text-warning">{food.qty}</td>
                <td className="text-warning">{food.size}</td>
                <td className="text-warning">{food.price}</td>
                <td className="text-danger">
                  <button
                    type="button"
                    className="btn p-0 container rounded text-white bg-danger"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tr>
            <td className="text-warning" colSpan="4">
              <h5 className="text-primary fst-italic">Sub Total</h5>
            </td>
            <td className="text-warning">
              <h5 className="text-primary fst-italic">{totalPrice}</h5>
            </td>
          </tr>
        </table>
        <div>
          <h1 className="fs-2">Total Price is {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
