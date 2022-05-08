import React, { Component } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

export default class Report extends Component {
constructor(props){
    super(props);

    this.state={
        posts:[]
    };
}


componentDidMount(){
    this.retrievePosts();
}

retrievePosts(){
    axios.get("/posts").then(res =>{
        if(res.data.success){
            this.setState({
                posts:res.data.existingPosts
            });

            console.log(this.state.posts)
        }
    });
}




  render() {
    return (
      <div className="container1">
          
          <h3 align="center"> Salary Details of All Employees</h3>
         

         
           <br></br>
         
          <table className="table table-striped , table table-bordered" style={{margineTop:'40px'}} ref={(Component) => (this.componentRef = Component)}>
          <thead class="table-dark">  
            <tr>    
                    <th scope="col">#</th>
                    <th scope="col">EID</th>
                    <th scope="col">FullName</th>
                    <th scope="col">EmployeeType</th>
                    <th scope="col">BasicSalary</th>
                    <th scope="col">OT</th>
                    <th scope="col">Allowance</th>
                    <th scope="col">NetPay</th>
                   
            </tr>
          </thead>
          <tbody>
                      {this.state.posts.map((posts,index) =>(
                          
                          
                              <tr key={index}>
                              <th scope="row">{index+1}</th>
                              <td>{posts.EID}</td> 
                              <td>{posts.FullName}</td>
                              <td>{posts.EmployeeType}</td>
                              <td>{posts.BasicSalary}</td>
                              <td>{posts.OT}</td>
                              <td>{posts.Allowance}</td>
                              <td>{posts.NetPay}</td>
                              </tr>
                      ))}  

                  </tbody>

              </table>   
              &nbsp;  &nbsp;   &nbsp; &nbsp; &nbsp;
                        

              <ReactToPrint trigger={() => (
              <button
              type="button"
              class="btn btn-danger"> 
                <i className="fas fa-print"></i> Print Now </button>   
          )}
          content={() => this.componentRef}/> 
        
      </div>
    );
  }
}