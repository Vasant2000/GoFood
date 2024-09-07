import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:5000/api/login", { password, email })
    .then((result) => {console.log(result.data.authToken,email);
      localStorage.setItem("authToken",result.data.authToken);
      localStorage.setItem("userEmail",email);
      navigate('/')
    } )
      .catch((err) => {console.log("error")
        if(err.response.status === 301){alert("Wrong Password")}})
     

     
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger"  >Create User</Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
