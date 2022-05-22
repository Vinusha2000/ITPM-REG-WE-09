import React, { Component } from "react";
import axios from "axios";

const initialState = {
  emp_id: "",
  firstName: "",
  lastName: "",
  address: "",
  mobileNo: "",
  email: "",
  salary: "",

  emp_idError: "",
  firstNameError: "",
  lastNameError: "",
  addressError: "",
  mobileNoError: "",
  emailError: "",
  salaryError: "",
};

export default class EmployeePost extends Component {
  state = initialState;

  constructor(props) {
    super(props);
    this.state = {
      emp_id: "",
      firstName: "",
      lastName: "",
      address: "",
      mobileNo: "",
      email: "",
      salary: "",

      emp_idError: "",
      firstNameError: "",
      lastNameError: "",
      addressError: "",
      mobileNoError: "",
      emailError: "",
      salaryError: "",
    };
  }

  //if any change in input of front end form, this will be identify it and get and update the new value
  handleInputChange = (e) => {
    //form control variables
    const { name, value } = e.target;
    //state set kr gnnw
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //validation
  validate = () => {
    let emp_idError: "";
    let firstNameError: "";
    let lastNameError: "";
    let addressError: "";
    let mobileNoError: "";
    let emailError: "";
    let salaryError: "";

    if (!this.state.emp_id) {
      emp_idError = "Employee ID is required !!!";
    }
    if (!this.state.firstName) {
      firstNameError = "First Name is required !!!";
    }
    if (!this.state.lastName) {
      lastNameError = "Last Name is required !!!";
    }
    if (!this.state.address) {
      addressError = "Address is required !!!";
    }
    if (!this.state.mobileNo) {
      mobileNoError = "Mobile No is required !!!";
    }
    if (!this.state.email) {
      emailError = "Email is required !!!";
    }
    if (!this.state.salary) {
      salaryError = "Salary is required !!!";
    }

    if (
      emp_idError ||
      firstNameError ||
      lastNameError ||
      addressError ||
      mobileNoError ||
      emailError ||
      salaryError
    ) {
      this.setState({
        emp_idError,
        firstNameError,
        lastNameError,
        addressError,
        mobileNoError,
        emailError,
        salaryError,
      });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { emp_id, firstName, lastName, address, mobileNo, email, salary } =
      this.state;

    //set data to variables
    const data = {
      emp_id: emp_id,
      firstName: firstName,
      lastName: lastName,
      address: address,
      mobileNo: mobileNo,
      email: email,
      salary: salary,
    };

    console.log(data);

    //validation
    const isValid = this.validate();
    if (isValid) {
      console.log(data);
      //clear form
      this.setState(initialState);
    }

    //give end point of post
    axios.post("http://localhost:8080/employee/save", data).then((res) => {
      if (res.data.success) {
        alert("Successfully Added New Employee");
        window.location.replace("/employee");

        this.setState({
          emp_id: "",
          firstName: "",
          lastName: "",
          address: "",
          mobileNo: "",
          email: "",
          salary: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto" style={{ minHeight: "700px" }}>
        <b>
          <h1 className="h3 mb-3 font-weight-normal">Create New Employee</h1>
        </b>

        <form className="needs-validation" noValidate>
          <div style={{ background: "hsl(180,60%,25%,0.9", padding: "20px" }}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                Emp ID
              </label>
              <input
                type="text"
                className="form-control"
                name="emp_id"
                placeholder="Enter Employee ID"
                value={this.state.emp_id}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.emp_idError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter first name"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.firstNameError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter last name"
                value={this.state.lastName}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.lastNameError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter address"
                value={this.state.address}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.addressError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNo"
                pattern="[0-9]*"
                placeholder="Enter Mobile number"
                value={this.state.mobileNo}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.mobileNoError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.emailError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Salary</label>
              <input
                type="text"
                className="form-control"
                name="salary"
                placeholder="Enter salary"
                value={this.state.salary}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.salaryError}{" "}
              </div>
            </div>

            <center>
              <button
                className="btn btn-danger"
                type="submit"
                style={{ marginTop: "15px", width: "40%" }}
                onClick={this.onSubmit}
              >
                <i className="far fa-check-square"></i>
                &nbsp; Save
              </button>
            </center>
          </div>
        </form>
      </div>
    );
  }
}
