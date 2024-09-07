import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">© 2021 GoFood, Inc</p>

          <Link
            to="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          ></Link>

          <ul className="nav col-md-4 justify-content-end"></ul>
        </footer>
      </div>
    );
  }
}

export default Footer;
