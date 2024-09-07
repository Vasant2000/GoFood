import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { json, Link , useNavigate} from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });*/
    const response = await axios
      .post("http://localhost:5000/api/createuser", {
        name,
        password,
        email,
        location,
      })
      .then((result) => {
        console.log(result.data.status);
        if (result.status === 200) 
          {alert("Valid Credentials"); console.log(result.status)}
        navigate("/login")

          
      })
      .catch((err) => {if(err.response.status === 300){alert("email already in use")}
    else{alert("Invalid Credentials")}})

      
      
  };

  return (
    <>
    <div>
          <Navbar />
        </div>
      <div className="container">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
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
              City
            </label>
            <input
              type="location"
              className="form-control"
              name="location"
              id="exampleInputPassword1"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
