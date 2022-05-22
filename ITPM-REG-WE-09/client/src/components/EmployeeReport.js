import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export default class EmployeeReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8080/employees").then((res) => {
      if (res.data.success) {
        this.setState({
          employees: res.data.existingEmployees,
        });

        console.log(this.state.employees);
      }
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <h3>Do you want to get a Report?</h3>
        <br></br>
        <h2>
          <center>All Employee Details</center>
        </h2>

        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginInlineStart: "0%" }}
            >
              <i className="fa-solid fa-print">Print this out!</i>
            </button>
          )}
          content={() => this.componentRef}
        />

        <table
          className="table table-success table-striped"
          style={{ marginTop: "40px" }}
          ref={(Component) => (this.componentRef = Component)}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Emp ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Email</th>
              <th scope="col">Salary</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employees, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/employeeStock/${employees._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {employees.emp_id}
                  </a>
                </td>

                <td>{employees.firstName}</td>
                <td>{employees.lastName}</td>
                <td>{employees.address}</td>
                <td>{employees.mobileNo}</td>
                <td>{employees.email}</td>
                <td>{employees.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
