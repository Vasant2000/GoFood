import "./App.css";
import Home from "./Screens/Home";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Screens/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./Screens/Signup.js";
import { CartProvider } from "./Components/ContextReducer.js";
import Cart from "./Screens/Cart.js";
import MyOrder from "./Screens/MyOrder.js";
import PaymentSuccess from "./Screens/PaymentSuccess.js";
import TestCart from "./Screens/TestCart.js"
import TestHome from "./Screens/TestHome.js"
import SeasonalHome from "./Screens/SeasonalHome.js"
import Navbar from "./Components/Navbar.js";
function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<TestHome />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/cart" element={<TestCart />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
          <Route exact path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route exact path="/season" element={<SeasonalHome />} />
          <Route exact path="/navbar" element={<Navbar />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
