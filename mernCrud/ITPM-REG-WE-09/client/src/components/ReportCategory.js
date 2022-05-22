import React, { Component } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

export default class Category extends Component {
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
          <h2>Do you want to get a Report?</h2>
          <h2><center>All Category Details</center></h2>

          <ReactToPrint trigger={() => (
              <button
              type="button"
              class="btn btn-danger"
              style={{marginInlineStart: "0%"}}>
                <i class="fas fa-print mr-2">Print this out!</i>
              </button>
          )}
          content={() => this.componentRef}/>

          <table className="table table-success table-striped" style={{marginTop:'40px'}} ref={(Component) => (this.componentRef = Component)}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cat_ID</th>
              <th scope="col">Category_Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                    <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                    {posts.Cat_ID}
                    </a>
                </td>
                <td>{posts.Category_Name}</td>
                <td>{posts.Description}</td>
                </tr>
            ))}
          </tbody>

        </table>   
        
      </div>
    );
  }
}