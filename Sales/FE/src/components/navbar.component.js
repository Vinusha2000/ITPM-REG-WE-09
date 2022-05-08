import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Images } from '../theme';
import logo from '../assests/logo36.png'

export default class Navbar extends Component {

  render() {
    return (
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">Sales Management</Link>
      //   <div className="collpase navbar-collapse">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="navbar-item">
      //         <Link to="/" className="nav-link">Sales</Link>
      //       </li>
      //       <li className="navbar-item">
      //         <Link to="/create" className="nav-link">Create a Sale</Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
      <nav>
        <div>
          <ul class="navbar-nav">
            <div style={{ display: 'flex', flexDirection: 'row' , flex:1,justifyContent:'space-between' , backgroundColor:'#0E4D90'}}>
            <div style={{display:'flex' , flexDirection:'row'}}>
              <img src={logo} alt='icon' style={{width:'40px' , height:'40px' , marginLeft:'20px'}}/>
                <li class="nav-item active">
                  <Link style={{color:'white'}} to="/" className="nav-link">Sales Management</Link>
                </li>
              </div>
              <div style={{display:'flex' , flexDirection:'row'}}>
                <li class="nav-item">
                  <Link  style={{color:'white'}} to="/" className="nav-link">Sales</Link>
                </li>
                <li class="nav-item">
                  <Link style={{color:'white'}} to="/create" className="nav-link">Create a Sale</Link>
                </li>
                <li class="nav-item">
                  <Link style={{color:'white'}} to="/create" className="nav-link">Report</Link>
                </li>
                <li class="nav-item">
                  <Link style={{color:'white'}} to="/chart" className="nav-link">Sale Chart</Link>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}