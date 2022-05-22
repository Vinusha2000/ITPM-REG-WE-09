import React, { Component } from "react";
import axios from "axios";

export default class Leave extends Component {
  //initialize constructor
  constructor(props) {
    super(props);

    this.state = {
      leaves: [], //get saved posts to an array
    };
  }

  //call retrievePosts method
  componentDidMount() {
    this.retrievePosts();
  }

  //database eke post are request (end point/get request path)
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

  //delete method implementation
  onDelete = (id) => {
    axios.delete(`http://localhost:8080/leave/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      window.location.replace("/leave");

      //new list display
      this.retrievePosts();
    });
  };

  //search method implementation

  filterData(leaves, searchKey) {
    //by filtering it gives a result
    const result = leaves.filter(
      (leave) =>
        leave.leave_id.toLowerCase().includes(searchKey) ||
        leave.fName.toLowerCase().includes(searchKey) ||
        leave.mail.toLowerCase().includes(searchKey)
    );

    this.setState({ leaves: result });
  }

  //search method implementation
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8080/leaves").then((res) => {
      if (res.data.success) {
        //existing data and search key -- > pass 2 parameters
        this.filterData(res.data.existingLeaves, searchKey);
      }
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <br></br>
            <h1 className="text-center">ALL LEAVE DETAILS</h1> <br></br>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <br></br>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea} //search method
            ></input>
          </div>
        </div>
        {/* <h1 className="text-center">ALL EMPLOYEE DETAILS</h1> <br></br>  table table-striped */}
        <table
          className="table table-striped"
          style={{ marginTop: "40px", width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Leave ID</th>
              <th scope="col">NIC</th>
              <th scope="col">First Name</th>
              <th scope="col">Email</th>
              <th scope="col">From Date</th>
              <th scope="col">To Date</th>
              <th scope="col">Leave Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaves.map((leaves, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>
                  <a
                    href={`/leave/${leaves._id}`}
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

                <td>
                  <a
                    className="btn btn-warning"
                    href={`/leaveEdit/${leaves._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp; &nbsp; &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(leaves._id)}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {this.state.posts.map((posts) => (
          <div>
            <p>{posts.topic}</p>
            <p>{posts.description}</p>
            <p>{posts.postCategory}</p>
          </div>
        ))} */}
        <br></br>
        <button className="btn btn-success">
          <a
            href="/leaveAdd"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create New Leave
          </a>
        </button>
        &nbsp; &nbsp;
        <button className="btn btn-danger">
          <a
            href="/leaveReport"
            style={{ textDecoration: "none", color: "white" }}
          >
            Generate Report
          </a>
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
