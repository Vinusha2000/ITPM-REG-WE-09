import React, { Component } from 'react';
import axios from 'axios';
import {setErrors} from "./../setErrors";

class CreatePost extends Component {

  constructor(props){
    super(props);
    this.state={
            EID:"",
            FullName:"",
            EmployeeType:"",
            BasicSalary:"",
            OT:"",
            Allowance:"",
            NetPay:"",
            errors:{}

    };
  }

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    });
  };

  calculate =()=>{
     let gross =parseInt(this.state.BasicSalary) + parseInt(this.state.OT) + parseInt(this.state.Allowance);
     this.setState ({...this.state,NetPay:gross})
  };




  validate = (EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay) => {

    const errors = setErrors(EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay);

    this.setState({errors:errors});

    return Object.values(errors).every((err) => err === "");
     
  };


  onSubmit = (e) =>{

    e.preventDefault();
    
    const{EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay} = this.state;

    if(this.validate(EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay)){

    }

    const data ={
      EID:EID,
      FullName:FullName,
      EmployeeType:EmployeeType,
      BasicSalary:BasicSalary,
      OT:OT,
      Allowance:Allowance,
      NetPay:NetPay
    }
  console.log(data)

   axios.post("/post/save",data).then((res) =>{
    if(res.data.success){
       alert("Added Successfully")
       window.location.replace("/")
      this.setState(
        {
          EID:"",
          FullName:"",
          EmployeeType:"",
          BasicSalary:"",
          OT:"",
          Allowance:"",
          NetPay:""
        }
      )
    }
})
};



  render() {
    return (
      <div className='bg-success p-2 text-dark bg-opacity-10'>
        <div className= " col-md-8 mt-4 mx-auto">
        <h1 className= "h3 mb-3 font-weight-normal">Create New Payment Details</h1>

        <form className="needs-validation" noValidate>

       <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> EID </label>
         <input type ="text"
          className="form-control"
          name="EID"
          placeholder=" Enter Employee ID"
          value={this.state.EID}
          onChange={this.handleInputChange}/>
          {this.state.errors.EID && (
            <div className="text-danger">{this.state.errors.EID}</div>
          )} 
        </div>  

        <br></br>
       <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> Full Name </label>
         <input type ="text"
          className="form-control"
          name="FullName"
          placeholder=" Enter Full Name"
          value={this.state.FullName}
          onChange={this.handleInputChange}/>
          {this.state.errors.FullName && (
            <div className="text-danger">{this.state.errors.FullName}</div>
          )} 

        </div>  
        <br></br>
      
        <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> Employee Type </label>
         
      
              <select class="form-select" 
              name="EmployeeType"
              value={this.state.EmployeeType}
              onChange={this.handleInputChange}>
               
                <option selected>Select Employee Type</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option >Assistant</option>
                <option >Technical Officer</option>
                <option >Store Manager</option>
                <option >Sales Officer</option>
                <option >Security Guard</option>
                <option >Cashier</option>
              </select>
              {this.state.errors.EmployeeType && (
            <div className="text-danger">{this.state.errors.EmployeeType}</div>
          )} 
               </div>  

              <br></br>

        <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> Basic Salary (RS.)</label>
         <input type ="text"
          className="form-control"
          name="BasicSalary"
          placeholder=" Enter Basic Salary"
          value={this.state.BasicSalary}
          onChange={this.handleInputChange}/>
          {this.state.errors.BasicSalary && (
            <div className="text-danger">{this.state.errors.BasicSalary}</div>
          )} 
        </div>  
        <br></br>

        <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> OT (RS.)</label>
         <input type ="text"
          className="form-control"
          name="OT"
          placeholder=" Enter OT Salary"
          value={this.state.OT}
          onChange={this.handleInputChange}/>
          {this.state.errors.OT && (
            <div className="text-danger">{this.state.errors.OT}</div>
          )} 
        </div>  

        <br></br>

        <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> Allowance (RS.)</label>
         <input type ="text"
          className="form-control"
          name="Allowance"
          placeholder=" Enter Allowance"
          value={this.state.Allowance}
          onChange={this.handleInputChange}/>
          {this.state.errors.Allowance && (
            <div className="text-danger">{this.state.errors.Allowance}</div>
          )} 
        </div>  

<br></br>

        <div class="d-grid gap-2">
  <button class="btn btn-primary" type="button" onClick={this.calculate}>Calculate Net Pay</button></div>

  <br></br>

        <div className="form-group" style={{margineBottom:'15px'}}>
         <label style={{margineBottom:'5px'}}> Net Pay (RS.)</label>
         <input type ="text"
          className="form-control"
          name="NetPay"
          placeholder=" Dispaly Netpay"
          value={this.state.NetPay}
          onChange={this.handleInputChange}/>
          {this.state.errors.NetPay && (
            <div className="text-danger">{this.state.errors.NetPay}</div>
          )} 
        </div>  

        <br></br>

<button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
<i className="far fa-check-square"></i>
&nbsp; Save </button>



</form>

</div>
</div>
    )} 
     
}

export default CreatePost;


