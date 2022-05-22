import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export default class LeaveReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leaves: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8080/leaves").then((res) => {
      if (res.data.success) {
        this.setState({
          leaves: res.data.existingLeaves,
        });

        console.log(this.state.leaves);
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
          <center>All Leave Details</center>
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
              <th scope="col">Leave ID</th>
              <th scope="col">NIC</th>
              <th scope="col">First Name</th>
              <th scope="col">Email</th>
              <th scope="col">From Date</th>
              <th scope="col">To Date</th>
              <th scope="col">Leave Type</th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaves.map((leaves, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/leaveStock/${leaves._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {leaves.leave_id}
                  </a>
                </td>

                <td>{leaves.nic}</td>
                <td>{leaves.fName}</td>
                <td>{leaves.mail}</td>
                <td>{leaves.fromDate}</td>
                <td>{leaves.toDate}</td>
                <td>{leaves.leaveType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
