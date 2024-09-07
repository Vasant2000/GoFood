import React from "react";
//import trash from "../trash.svg";
//import Navbar from "../components/Navbar";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import axios from "axios";

export default function Cart() {
  let razor_id = console.log("Cart", window);
  let data = useCart();
  let dispatch = useDispatchCart();
  //console.log("disatch",dispatch)
  if (data.length === 0) {
    return (
      <div>
        {" "}
        <div className="m-5 w-100 text-center fs-3">The Cart Is Empty!</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  //console.log(totalPrice)

  

  const handleCheckOut = async () => {
    //console.log(totalPrice)
    let now = new Date();
    let date = now.toLocaleString();
    let userEmail = localStorage.getItem("userEmail");

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    let response = await axios
      .post("http://localhost:5000/api/orderData", {
        userEmail,
        data,
        date,
        totalPrice,
      })
      .then((result) => {
        console.log(result);

        const options = {
          key_id: "rzp_test_VgiFlNXXFUrFOG", // Enter the Key ID generated from the Dashboard
          one_click_checkout: true,
          amount: totalPrice * 10000,
          name: "Cart Corp", //your business name
          order_id: result.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
          show_coupons: true, // default true; false if coupon widget should be hidden
          callback_url: "http://localhost:5000/api/payVer",
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: "Gaurav Kumar", //your customer's name
            email: "gaurav.kumar@example.com",
            contact: "9619044217", //Provide the customer's phone number for better conversion rates
            coupon_code: "COUPON50", // any valid coupon code that gets auto-applied once magic opens
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
        };
        console.log(options.order_id);
        const razor = new window.Razorpay(options);
        console.log(razor);
        razor.open();
        console.log("Cart here")
        if (result.status === 200) {
          dispatch({ type: "DROP" });
        }
      });

 
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-info fs-4">
            <tr className=" container">
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
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
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
            <td className="text-warning"></td>
            <td className="text-warning"></td>
            <td className="text-warning"></td>
            <td className="text-warning">
              <h5 className="text-primary fst-italic">Sub Total</h5>
            </td>
            <td className="text-warning">
              <h5 className="text-primary fst-italic">{totalPrice}</h5>
            </td>
          </tr>
        </table>
        <div>
          <h1 className="fs-2">Total Price is ₹{totalPrice}/-</h1>
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
