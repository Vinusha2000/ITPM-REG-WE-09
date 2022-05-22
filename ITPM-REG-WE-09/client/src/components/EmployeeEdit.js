import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../withRouter";

const initialState = {
  emp_id: "",
  firstName: "",
  lastName: "",
  address: "",
  mobileNo: "",
  email: "",
  salary: "",
};

class EmployeeEdit extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();

    //we are updating specific post, so we get the id

    const id = this.props.params.id;

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

    //   //if we give variables , we use ``
    //   //due to update, we use put here
    //3000
    axios
      .put(`http://localhost:8080/employee/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          //alert mg after updating
          alert("Employee Updated Successfully");
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

  // //get values for specific id
  componentDidMount() {
    const id = this.props.params.id;
    console.log(id);

    axios.get(`http://localhost:8080/employee/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          emp_id: res.data.employee.emp_id,
          firstName: res.data.employee.firstName,
          lastName: res.data.employee.lastName,
          address: res.data.employee.address,
          mobileNo: res.data.employee.mobileNo,
          email: res.data.employee.email,
          salary: res.data.employee.salary,
        });

        console.log(this.state.employee);
      }
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit new employee</h1>

        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Emp ID</label>
            <input
              type="text"
              className="form-control"
              name="emp_id"
              placeholder="Enter Employee ID"
              value={this.state.emp_id}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter first name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Enter last name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            ></input>
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
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="mobileNo"
              placeholder="Enter Mobile number"
              value={this.state.mobileNo}
              onChange={this.handleInputChange}
            ></input>
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
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp; Update
          </button>
        </form>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="col-md-8 mt-4 mx-auto">
  //       <h1 className="h3 mb-3 font-weight-normal">Edit new employee</h1>

  //       <form className="needs-validation" noValidate>
  //         <div className="form-group" style={{ marginBottom: "15px" }}>
  //           <label style={{ marginBottom: "5px" }}>First Name</label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             name="firstName"
  //             placeholder="Enter First Name"
  //             // value={this.state.firstName}
  //             onChange={this.handleInputChange}
  //           ></input>
  //         </div>
  //       </form>
  //     </div>
}

export default withRouter(EmployeeEdit);
