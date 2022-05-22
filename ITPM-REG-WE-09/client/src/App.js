import React, { Component } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Employee from "./components/Employee";
import EmployeePost from "./components/EmployeePost";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeReport from "./components/EmployeeReport";
import NavBar from "./components/NavBar";

import Leave from "./components/Leave";
import LeavePost from "./components/LeavePost";
import LeaveEdit from "./components/LeaveEdit";
import LeaveDetails from "./components/LeaveDetails";
import LeaveReport from "./components/LeaveReport";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar></NavBar>

          <Routes>
            <Route exact path="/" element={<Employee />} />
            <Route exact path="/employee" element={<Employee />} />
            <Route exact path="/employeeAdd" element={<EmployeePost />} />
            <Route exact path="/employeeEdit/:id" element={<EmployeeEdit />} />
            {/* <Route path="/employeeEdit/:id" element={EmployeeEdit} /> */}
            <Route
              exact
              path="/employeeDetails/:id"
              element={<EmployeeDetails />}
            />
            <Route exact path="/employeeReport" element={<EmployeeReport />} />
          </Routes>

          <Routes>
            <Route exact path="/leave" element={<Leave />} />
            <Route exact path="/leaveAdd" element={<LeavePost />} />
            <Route exact path="/leaveEdit/:id" element={<LeaveEdit />} />
            {/* <Route path="/leaveEdit/:id" element={LeaveEdit} /> */}
            <Route exact path="/leaveDetails/:id" element={<LeaveDetails />} />
            <Route exact path="/leaveReport" element={<LeaveReport />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
