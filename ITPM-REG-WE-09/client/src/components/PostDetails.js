import React, { Component } from 'react';
// import axios from 'axios';

 class PostDetails extends Component {
    constructor(props){
        super(props);

        this.state ={
            post:{}


        };

    } 

    // componentDidMount(){
              
    //     const id = this.props.match.params.id;

    //     axios.get(`/posts/${id}`).then((res) =>{
    //        if(res.data.success){
    //            this.setState({
    //                post:res.data.post

    //            });

    //            console.log(this.state.post);
    //        }


    //     });

    // }

    render(){

      const {EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay}  = this.state.post;
        return(
            <div>
                {/* style={{marginTop:'20px'}}
                <h4>{EID}</h4>
                <hr/> */}

            <dl className="row">

               <dt className="col-sm-3">EID</dt> 
               <dt className="col-sm-9">{EID}</dt>


               <dt className="col-sm-3">FullName</dt> 
               <dt className="col-sm-9">{FullName}</dt>
                
               <dt className="col-sm-3">EmployeeType</dt> 
               <dt className="col-sm-9">{EmployeeType}</dt>

               <dt className="col-sm-3">BasicSalary</dt> 
               <dt className="col-sm-9">{BasicSalary}</dt>

               <dt className="col-sm-3">OT</dt> 
               <dt className="col-sm-9">{OT}</dt>

               <dt className="col-sm-3">Allowance</dt> 
               <dt className="col-sm-9">{Allowance}</dt> 

                <dt className="col-sm-3">NetPay</dt> 
               <dt className="col-sm-9">{NetPay}</dt> 
               
                </dl>    
                  
            </div>
        )
    }
}
export default PostDetails;