import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import SalesList from "./components/sales-list.component";
import EditSale from "./components/edit-sale.component";
import CreateSale from "./components/create-sale.component";
import SalesChart from './components/sales-chart.component';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br />
        <Route path="/" exact component={SalesList} />
        <Route path="/edit/:id" component={EditSale} />
        <Route path="/create" component={CreateSale} />
        <Route path="/chart" component={SalesChart} />
      </div>
    </Router>

  );
}

export default App;
