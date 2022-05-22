import React, { Component } from "react";
import axios from "axios";

const initialState = {
  leave_id: "",
  nic: "",
  fName: "",
  mail: "",
  fromDate: "",
  toDate: "",
  leaveType: "",

  leave_idError: "",
  nicError: "",
  fNameError: "",
  mailError: "",
  fromDateError: "",
  toDateError: "",
  leaveTypeError: "",
};

export default class LeavePost extends Component {
  state = initialState;

  constructor(props) {
    super(props);
    this.state = {
      leave_id: "",
      nic: "",
      fName: "",
      mail: "",
      fromDate: "",
      toDate: "",
      leaveType: "",

      leave_idError: "",
      nicError: "",
      fNameError: "",
      mailError: "",
      fromDateError: "",
      toDateError: "",
      leaveTypeError: "",
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
    let leave_idError: "";
    let nicError: "";
    let fNameError: "";
    let mailError: "";
    let fromDateError: "";
    let toDateError: "";
    let leaveTypeError: "";

    if (!this.state.leave_id) {
      leave_idError = "Leave ID is required !!!";
    }
    if (!this.state.nic) {
      nicError = "NIC is required !!!";
    }
    if (!this.state.fName) {
      fNameError = "First Name is required !!!";
    }
    if (!this.state.mail) {
      mailError = "Email is required !!!";
    }
    if (!this.state.fromDate) {
      fromDateError = "From Date is required !!!";
    }
    if (!this.state.toDate) {
      toDateError = "To Date is required !!!";
    }
    if (!this.state.leaveType) {
      leaveTypeError = "Leave Type is required !!!";
    }

    if (
      leaveTypeError ||
      nicError ||
      fNameError ||
      mailError ||
      fromDateError ||
      toDateError ||
      leaveTypeError
    ) {
      this.setState({
        leave_idError,
        nicError,
        fNameError,
        mailError,
        fromDateError,
        toDateError,
        leaveTypeError,
      });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { leave_id, nic, fName, mail, fromDate, toDate, leaveType } =
      this.state;

    //set data to variables
    const data = {
      leave_id: leave_id,
      nic: nic,
      fName: fName,
      mail: mail,
      fromDate: fromDate,
      toDate: toDate,
      leaveType: leaveType,
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
    axios.post("http://localhost:8080/leave/save", data).then((res) => {
      if (res.data.success) {
        alert("Successfully Added New Leave");
        window.location.replace("/leave");

        this.setState({
          leave_id: "",
          nic: "",
          fName: "",
          mail: "",
          fromDate: "",
          toDate: "",
          leaveType: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto" style={{ minHeight: "700px" }}>
        <b>
          <h1 className="h3 mb-3 font-weight-normal">Create new leave</h1>
        </b>
        <form className="needs-validation" noValidate>
          <div style={{ background: "hsl(180,60%,25%,0.9", padding: "20px" }}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                Leave ID
              </label>
              <input
                type="text"
                className="form-control"
                name="leave_id"
                placeholder="Enter Leave ID"
                value={this.state.leave_id}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.leave_idError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>NIC</label>
              <input
                type="text"
                className="form-control"
                name="nic"
                placeholder="Enter NIC"
                value={this.state.nic}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.nicError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="fName"
                placeholder="Enter first name"
                value={this.state.fName}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.fNameError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="mail"
                placeholder="Enter email"
                value={this.state.mail}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.mailError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                From Date
              </label>
              <input
                type="text"
                className="form-control"
                name="fromDate"
                placeholder="Enter From Date"
                value={this.state.fromDate}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.fromDateError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                To Date
              </label>
              <input
                type="text"
                className="form-control"
                name="toDate"
                placeholder="Enter To Date"
                value={this.state.toDate}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.toDateError}{" "}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px", color: "white" }}>
                Leave Type
              </label>
              <input
                type="text"
                className="form-control"
                name="leaveType"
                placeholder="Enter Leave Type"
                value={this.state.leaveType}
                onChange={this.handleInputChange}
              ></input>
              <div style={{ fontSize: 12, color: "red" }}>
                {" "}
                {this.state.leaveTypeError}{" "}
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
