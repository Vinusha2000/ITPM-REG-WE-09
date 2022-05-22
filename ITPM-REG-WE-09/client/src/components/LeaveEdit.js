import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../withRouter";

const initialState = {
  leave_id: "",
  nic: "",
  fName: "",
  mail: "",
  fromDate: "",
  toDate: "",
  leaveType: "",
};

class LeaveEdit extends Component {
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

    //   //if we give variables , we use ``
    //   //due to update, we use put here
    //3000
    axios.put(`http://localhost:8080/leave/update/${id}`, data).then((res) => {
      if (res.data.success) {
        //alert mg after updating
        alert("Leave Updated Successfully");
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

  // //get values for specific id
  componentDidMount() {
    const id = this.props.params.id;
    console.log(id);

    axios.get(`http://localhost:8080/leave/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          leave_id: res.data.leave.leave_id,
          nic: res.data.leave.nic,
          fName: res.data.leave.fName,
          mail: res.data.leave.mail,
          fromDate: res.data.leave.fromDate,
          toDate: res.data.leave.toDate,
          leaveType: res.data.leave.leaveType,
        });

        console.log(this.state.leave);
      }
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit new leave</h1>

        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Leave ID</label>
            <input
              type="text"
              className="form-control"
              name="leave_id"
              placeholder="Enter Leave ID"
              value={this.state.leave_id}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>NIC</label>
            <input
              type="text"
              className="form-control"
              name="nic"
              placeholder="Enter NIC"
              value={this.state.nic}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>First Name</label>
            <input
              type="text"
              className="form-control"
              name="fName"
              placeholder="Enter first name"
              value={this.state.fName}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Email</label>
            <input
              type="text"
              className="form-control"
              name="mail"
              placeholder="Enter email"
              value={this.state.mail}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>From Date</label>
            <input
              type="text"
              className="form-control"
              name="fromDate"
              placeholder="Enter From Date"
              value={this.state.fromDate}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>To Date</label>
            <input
              type="text"
              className="form-control"
              name="toDate"
              placeholder="Enter To Date"
              value={this.state.toDate}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Leave Type</label>
            <input
              type="text"
              className="form-control"
              name="leaveType"
              placeholder="Enter Leave Type"
              value={this.state.leaveType}
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
}

export default withRouter(LeaveEdit);
