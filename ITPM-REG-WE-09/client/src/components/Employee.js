import React, { Component } from "react";
import axios from "axios";

export default class Employee extends Component {
  //initialize constructor
  constructor(props) {
    super(props);

    this.state = {
      employees: [], //get saved posts to an array
    };
  }

  //call retrievePosts method
  componentDidMount() {
    this.retrievePosts();
  }

  //database eke post are request (end point/get request path)
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

  //delete method implementation
  onDelete = (id) => {
    axios.delete(`http://localhost:8080/employee/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      window.location.replace("/employee");

      //new list display
      this.retrievePosts();
    });
  };

  //search method implementation

  filterData(employees, searchKey) {
    //by filtering it gives a result
    const result = employees.filter(
      (employee) =>
        employee.emp_id.toLowerCase().includes(searchKey) ||
        employee.lastName.toLowerCase().includes(searchKey) ||
        employee.address.toLowerCase().includes(searchKey) ||
        //post.mobileNo.toLowerCase().includes(searchKey) ||
        employee.email.toLowerCase().includes(searchKey)
      //post.salary.toLowerCase().includes(searchKey)
    );

    this.setState({ employees: result });
  }

  //search method implementation
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8080/employees").then((res) => {
      if (res.data.success) {
        //existing data and search key -- > pass 2 parameters
        this.filterData(res.data.existingEmployees, searchKey);
      }
    });
  };

  //get data to display in interface (show data in frontend)
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <br></br>
            <h1 className="text-center">ALL EMPLOYEE DETAILS</h1>
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
          className="table table-success table-striped"
          style={{ marginTop: "40px" }}
        >
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Emp ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Email</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employees, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>
                  <a
                    href={`/employee/${employees._id}`}
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

                <td>
                  <a
                    className="btn btn-warning"
                    href={`/employeeEdit/${employees._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp; &nbsp; &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => this.onDelete(employees._id)}
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
            href="/employeeAdd"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create New Employee
          </a>
        </button>
        &nbsp; &nbsp;
        <button className="btn btn-danger">
          <a
            href="/employeeReport"
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
