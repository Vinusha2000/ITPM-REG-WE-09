import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../withRouter';

 class PostDetails extends Component {

    constructor(props){
        super(props);

        this.state ={
            post:{}

        };

    } 






    componentDidMount(){
              
        // console.log(this.props)
        const id = this.props.params.id;
        console.log(id)
        axios.get(`/post/${id}`).then((res) =>{
           if(res.data.success){
               this.setState({
                   post:res.data.post

               });

               console.log(this.state.post);
           }


        });

    }

    render(){
       

      const {EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay}  = this.state.post;
        return(
            <div>
                           
            
<div className='bg-success p-2 text-dark bg-opacity-10'>
            
<div className= " col-md-8 mt-4 mx-auto">   
<ul><h1 className= "h3 mb-3 font-weight-normal"> Salary Details :- {FullName}</h1> </ul>            
            
            <dl className="row">

                
                
               <dt className="col-sm-3">EID</dt> 
               <dt className="col-sm-9">{EID} </dt>

               <br></br><br></br>

            

               <dt className="col-sm-3">FullName</dt> 
               <dt className="col-sm-9">{FullName}</dt>

               <br></br><br></br>
                
               <dt className="col-sm-3">EmployeeType</dt> 
               <dt className="col-sm-9">{EmployeeType}</dt>


               <br></br><br></br>
               <dt className="col-sm-3">BasicSalary</dt> 
               <dt className="col-sm-9">{BasicSalary}</dt>

               <br></br><br></br>

               <dt className="col-sm-3">OT</dt> 
               <dt className="col-sm-9">{OT}</dt>
               <br></br><br></br>

               <dt className="col-sm-3">Allowance</dt> 
               <dt className="col-sm-9">{Allowance}</dt> 
               <br></br><br></br>

                <dt className="col-sm-3">NetPay</dt> 
               <dt className="col-sm-9">{NetPay}</dt> 
               <br></br><br></br>
                </dl>    
                  
            


            
            </div>
            </div>
            </div>
        )
    }
}
export default withRouter(PostDetails);