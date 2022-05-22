import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Images } from '../theme';
import logo from '../assets/logo.png';

class Navbar extends Component {

  render() {
    return (
      <nav>
        <div>
          <ul className="navbar-nav">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: "#0E4D90",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={logo}
                  alt="icon"
                  style={{ width: "40px", height: "50px", marginLeft: "20px" }}
                />

                <li className="nav-item active">
                  <Link style={{ color: "white" }} to="#" className="nav-link">
                    SUNSHINE Super Market
                  </Link>
                </li>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <li className="nav-item">
                  <Link style={{ color: "white" }} to="/" className="nav-link">
                    Payroll Management
                  </Link>
                </li>
                &nbsp;
                
                
              </div>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navbar;