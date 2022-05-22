import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "../withRouter";

class EmployeeDetails extends Component {
  //initializing the constructor
  constructor(props) {
    super(props);

    //declare variable to save post
    this.state = {
      employee: {}, //initialize variable to empty object
    };
  }

  componentDidMount() {
    //get post unique id
    //save that id to this id variable
    const id = this.props.params.id;
    console.log(id);

    axios.get(`http://localhost:8080/employee/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          employee: res.data.employee,
        });

        console.log(this.state.employee);
      }
    });
  }

  render() {
    //get those details to 'employee' variable
    const { emp_id, firstName, lastName, address, mobileNo, email, salary } =
      this.state.employee;

    return (
      <div style={{ marginTop: "20px" }}>
        <h4>{emp_id}</h4>
        <hr />

        <dl className="row">
          <dt className="col-sm-3">first Name</dt>
          <dd className="col-sm-9">{firstName}</dd>

          <dt className="col-sm-3">last Name</dt>
          <dd className="col-sm-9">{lastName}</dd>

          <dt className="col-sm-3">Address</dt>
          <dd className="col-sm-9">{address}</dd>

          <dt className="col-sm-3">Mobile No</dt>
          <dd className="col-sm-9">{mobileNo}</dd>

          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9">{email}</dd>

          <dt className="col-sm-3">Salary</dt>
          <dd className="col-sm-9">{salary}</dd>
        </dl>
      </div>
    );
  }
}

export default withRouter(EmployeeDetails);
