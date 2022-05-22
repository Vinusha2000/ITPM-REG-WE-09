import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  Cat_ID:"",
  Category_Name:"",
  Description:"",
  Category_NameError: "",
  DescriptionError: "",
};

export default class CreatePost extends Component {

  state = initialState;

  constructor(props){
    super(props);
    this.state={
      Cat_ID:"",
      Category_Name:"",
      Description:"",

      Category_NameError: "",
      DescriptionError: "",
    };
  }

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }


  //validation
  validate = () => {
    let Category_NameError = "";
    let DescriptionError = "";

    if (!this.state.Category_Name) {
      Category_NameError = "This field is required !!!";
    }

    if (!this.state.Description) {
      DescriptionError = "This field is required !!!";
    }

    if (Category_NameError || DescriptionError) {
      this.setState({ Category_NameError,DescriptionError});
      return false;
    }
    return true;
  }


  onSubmit = (e) =>{

    e.preventDefault();

    const {Cat_ID,Category_Name,Description} = this.state;

    const data ={
      Cat_ID:Cat_ID,
      Category_Name:Category_Name,
      Description:Description
    }

    console.log(data);

    const isValid = this.validate();
    if (isValid) {
      console.log(data);
      this.setState(initialState);
    }

    axios.post("/post/save",data).then((res) =>{
      if(res.data.success){
        alert("Category Add Successfully")
        window.location.replace("/category")
        this.setState(
          {
            Cat_ID:"",
            Category_Name:"",
            Description:""
          }
        )
      }
    })

  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto" style={{minHight:"700px"}}>
        <b><h1 className="h3 mb-3 font-weight-normal">Create New Category</h1></b>
        <form className="needs-validation" noValidate>
          <div style={{background:"hsl(180,60%,25%,0.9)", padding:"20px"}}>
          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:"white"}}>Cat_ID</label>
            <input type="text"
            className="form-control"
            name="Cat_ID"
            placeholder="Enter Cat_ID"
            value={this.state.Cat_ID}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:"white"}}>Category_Name</label>
            <input type="text"
            className="form-control"
            name="Category_Name"
            placeholder="Enter Category_Name"
            value={this.state.Category_Name}
            onChange={this.handleInputChange}/>
            <div style={{fontSize:16, color: "red"}}>
              { "" }
              {this.state.Category_NameError}{""}
            </div>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px',color:"white"}}>Description</label>
            <select className="form-select"
            name="Description"
            value={this.state.Description}
            onChange={this.handleInputChange}>
              <option selected>Select Description</option>
              <option>All Fresh Fruits</option>
              <option>All Quality Foods</option>
              <option>All Fresh Vegetable</option>
              <option>All kinds of snacks</option>
              <option>Generally be Smooth and Soft</option>
              <option>Soft and Cool</option>
              <option>Other</option>
              {/* <option></option>
              <option>Three</option> */}
            </select>
            <div style={{fontSize:16, color: "red"}}>
              { "" }
              {this.state.DescriptionError}{""}
            </div>
          </div>

          <center><button className="btn btn-danger" type="submit" style={{marginTop:'15px',width:"40%"}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; Save
          </button></center>
          </div>
        </form>
        &nbsp;
      </div>
    )
  }
}