import React, { useState,useRef,useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import descriptionModal from "../DescriptionModal"; 

export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  let img = props.src
  let data = useCart();

  let [descView,setDescView] = useState(false)
  //console.log(priceOptions)
  //console.log("this is",options)
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  //console.log("options",options,options.size,size)
  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]); 
  
  
  const handleAddCart = async () => {
    // Ensure data is properly retrieved
    console.log("Current cart data:", data,size);
  
    let existingItem = null;
  
    // Find if the item with the same ID exists in the cart
    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        existingItem = item;
        break; // Exit loop once the item is found
      }
    }
  
    console.log("Found item:", existingItem);
  
    if (existingItem) {
      if (existingItem.size === size) {
        // If the item is found and the size matches, update the existing item
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
          size: size,
          img: img,
        });
        console.log("Item updated with same size");
      } else {
        // If the item is found but size is different, add a new item with the different size
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: img,
        });
        console.log("Added new item with different size");
      }
    } else {
      // If the item is not found, add it as a new item
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: img,
      });
      console.log("New item added to the cart");
    }
  
    // Notify the user
    //alert("Added to cart");
  
    // Re-fetch or update local cart data if needed
    // Example: setData(updatedCartData);  // Ensure you handle the updated cart data properly
  };


  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  
  return (
    
    <div>
      
      <div>
        <div
          className="card mt-3 container rounded "
          style={{ width: "18rem", maxHeight: "200px" }}
          id="card"
        />
        <img onClick={()=>setDescView(true)}
          style={{ idth: "100px", height: "200px", objectFit: "fill" }}
          className="card-img-top p-0 "
          src={foodItem.img}
          alt="Card image cap"
         
        />
        <div><hr/></div> {descView ? <descriptionModal className="fst-italic" onClose={()=>setDescView(false)}>{foodItem.description}</descriptionModal> : null}
        
        <div className="card-body ">
          <h5 className="card-title m-1 mt-3 mb-1">{foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="  h-100  bg-warning text-dark rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-warning text-dark rounded"
              ref={priceRef} 
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <hr />

          <div className="container d-flex  p-0">
            <div>
              <p className="d-flex flex-row mx-3 ms-2 ">
              ₹{finalPrice}/-
              </p>
            </div>
            <div className="d-flex flex-row-reverse me-3 mx-auto ">
              <button
                className="btn btn-primary ms-2 mb-2 text-right text-warning"
                onClick={handleAddCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
