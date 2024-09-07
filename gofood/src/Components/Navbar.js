import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import '../Components/Navbar.css';

function Navbar({ openCartModal }) {
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid bg-primary">
        <Link className="navbar-brand" to="/">
          <span className="text-warning fs-1 fst-itallic">GoFood</span>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link active text-warning fs-5" aria-current="page" to="/">Home</Link>
            {localStorage.getItem("authToken") && (
              <Link className="nav-link active text-warning fs-5" to='/myOrder'>My Orders</Link>
            )}
          </div>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-warning text-white mx-1" to="/login">Login</Link>
              <Link className="btn bg-warning text-white mx-1" to="/createuser">Signup</Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-warning text-white mx-1" onClick={openCartModal}>
                My Cart {" "}
                <div className="badge bg-danger bg-pill rounded">{data.length}</div>
              </div>
              <div className="btn bg-warning text-danger mx-1" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
