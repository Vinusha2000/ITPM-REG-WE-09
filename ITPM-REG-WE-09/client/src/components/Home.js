/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{ Component } from 'react';
import axios from 'axios';





class Home extends Component {
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


onDelete = (id) =>{
    axios.delete(`/post/delete/${id}`).then((res) =>{
        alert("Deleted Sucessfully");
        this.retrievePosts();
    });

}



filterData(posts,searchKey){

const result = posts.filter((posts) =>
posts.EID.toLowerCase().includes(searchKey)||
posts.EID.toUpperCase().includes(searchKey)||
 posts.EmployeeType.toLowerCase().includes(searchKey)||
 posts.FullName.toLowerCase().includes(searchKey)||
 posts.NetPay.includes(searchKey)||
 posts.EmployeeType.toUpperCase().includes(searchKey)||
 posts.FullName.toUpperCase().includes(searchKey)
 
 )

 this.setState({posts:result})

}





handleSearchArea = (e) =>{
    const searchKey= e.currentTarget.value;

    axios.get("/posts").then(res =>{
        if(res.data.success){
         
            this.filterData(res.data.existingPosts,searchKey)


        }
    });

   

}




    render(){
        return(
            
            
            <div className='bg-success p-2 text-dark bg-opacity-10' >
               <div className='row'>
                   {/* <div className='col-lg-3 mt-2 mb-2'>
                   
                   </div> */}
                   <h3 align="center"> Salary Details of All Employees</h3>
                   <div className='col-lg-3 mt-2 mb-2'>
                       <input
                       className='form-control'
                       type="search"
                       placeholder='Type to Search...'
                       name='searchQuery'
                       onChange={this.handleSearchArea}>
                       </input>
                       <br></br>
                       
                       <button className="btn btn-success" > 
                        <a href="/add" style={{textDecoration:'none',color:'white'}}>
                         <i className="fas fa-add"></i> Add New Employee</a>
                        </button>
                        &nbsp;  &nbsp;   &nbsp;
                        &nbsp;
                         
                            <button className="btn btn-danger" >
                                <a href="/Report" style={{textDecoration:'none',color:'white'}}>
                            <i className="fas fa-print"></i> Print </a></button>
                   </div>
               </div>
               
              <table className="table table-striped , table table-bordered" style={{margineTop:'40px'}} >
                  
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
                    <th scope="col">Actions</th>
                    
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
                             
                              <td>

                                 <a className="btn btn-primary" href={`/post/${posts._id}`}>
                                  <i className="fas fa-eye"></i>&nbsp;View   
                                  </a>
                                  &nbsp;

                                  <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                                  <i className="fas fa-edit"></i>&nbsp;Edit    
                                  </a>
                                  &nbsp;
                                  <a className="btn btn-danger" 
                                  href="#" 
                                  onClick={() =>this.onDelete(posts._id)}>
                                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                  </a>
                                  
                              </td>

                          </tr>
                      ))}  

                  </tbody>

              </table>

            </div>
        )
                      }
}

              

 export default Home;           