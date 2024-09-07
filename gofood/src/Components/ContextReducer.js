import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  //console.log(action);
  
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: action.id, name: action.name, price: action.price, qty: action.qty, size : action.size , img: action.img },
      ];
      console.log(state);
      
      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index,1)
        return newArr
        
      case "DROP":
        let empArray = []
        return empArray

      case "UPDATE":
      let arr=[...state]
      console.log(arr);
      arr.find((a,idx)=>{
        console.log(a,action);
        if(a.id===action.id && a.size === action.size)
        {
            console.log('updated',action, a);
            arr[idx]={...a, qty:(parseInt(action.qty)+a.qty), price:(action.price+a.price)} // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
        }

    })
      return arr

    default:
      console.log("Error in Reducer");
  }
  console.log("context",state);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
// console.log("CartProvider",state,dispatch);
  return (//console.log("context",CartStateContext),
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
    
  );
  
};
export const useCart = () => useContext(CartStateContext);
//console.log(useCart)
export const useDispatchCart = () => useContext(CartDispatchContext);
