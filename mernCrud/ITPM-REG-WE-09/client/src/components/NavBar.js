import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default class NavBar extends Component {
  render() {
    return (
    
    //<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd'}}>
  //<div className="container-fluid">
    


    //<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      //<span className="navbar-toggler-icon"></span>
    //</button>
    //<div className="collapse navbar-collapse" id="navbarNav">
      //<ul className="navbar-nav">
        //<li className="nav-item">
          //<a className="nav-link" href="#">Dashboard</a>
        //</li>
        //<li className="nav-item">
          //<a className="nav-link"  href="/">Item</a>
        //</li>
        //<li className="nav-item">
          //<a className="nav-link"  href="/category">Category</a>
        //</li>
        
      //</ul>
    //</div>
  //</div>
//</nav>

      <nav>
        <div>
          <ul className="navbar-nav">
          &nbsp;
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                backgroundColor: "#0E4D90",

              }}
              >
                
                <div style={{ display: "flex", flexDirection: "row"}}>
                  <img 
                    src={logo}
                    alt="icon"
                    style={{ width: "40px", height: "50px", marginLeft: "20px" }}
                  />
                  &nbsp;
                  &nbsp;
                  <li className="nav-item-active">
                    <Link style={{ color: "white" }} to="#" className="nav-link">
                      SUNSHINE Super Market
                    </Link>
                  </li>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                <li className="nav-item">
                  <Link style={{ color: "white" }} to="#" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                &nbsp;
                &nbsp;
                &nbsp;
                <li className="nav-item">
                  <Link style={{ color: "white" }} to="/" className="nav-link">
                    ITEM
                  </Link>
                </li>
                &nbsp;
                &nbsp;
                &nbsp;
                <li className="nav-item">
                  <Link style={{ color: "white" }} to="/category" className="nav-link">
                    CATEGORY
                  </Link>
                </li>
                &nbsp;
                &nbsp;
                &nbsp;
              </div>

            </div>
            &nbsp;
          </ul>
        </div>
      </nav>


    );
  }
}