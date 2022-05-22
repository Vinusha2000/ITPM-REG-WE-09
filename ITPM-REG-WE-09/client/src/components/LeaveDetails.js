import React, { Component } from "react";
import axios from "axios";

export default class LeaveDetails extends Component {
  //initializing the constructor
  constructor(props) {
    super(props);

    //declare variable to save post
    this.state = {
      leave: {}, //initialize variable to empty object
    };
  }

  componentDidMount() {
    //get post unique id
    //save that id to this id variable
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8080/leave/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          leave: res.data.leave,
        });

        console.log(this.state.leave);
      }
    });
  }

  render() {
    //get those details to 'leave' variable
    const { leave_id, nic, fName, mail, fromDate, toDate, leaveType } =
      this.state.leave;

    return (
      <div style={{ marginTop: "20px" }}>
        <h4>{leave_id}</h4>
        <hr />

        <dl className="row">
          <dt className="col-sm-3">NIC</dt>
          <dd className="col-sm-9">{nic}</dd>

          <dt className="col-sm-3">First Name</dt>
          <dd className="col-sm-9">{fName}</dd>

          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{mail}</dd>

          <dt className="col-sm-3">From Date</dt>
          <dd className="col-sm-9">{fromDate}</dd>

          <dt className="col-sm-3">To Date</dt>
          <dd className="col-sm-9">{toDate}</dd>

          <dt className="col-sm-3">Leave Type</dt>
          <dd className="col-sm-9">{leaveType}</dd>
        </dl>
      </div>
    );
  }
}
