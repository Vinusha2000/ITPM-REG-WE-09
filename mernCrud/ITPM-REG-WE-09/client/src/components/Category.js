import React, { Component } from 'react';
import axios from 'axios';
//import posts from '../../models/posts';


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

  onDelete = (id) =>{

    axios.delete(`/post/delete/${id}`).then((res) =>{
      alert("Delete Category Successfully");
      window.location.replace("/category")
      this.retrievePosts();
    })

  }

  filterData(posts,searchKey){

    const result = posts.filter((post) =>
    post.Cat_ID.toLowerCase().includes(searchKey) ||
    post.Category_Name.toLowerCase().includes(searchKey) ||
    post.Description.toLowerCase().includes(searchKey)
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


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Category Details</h4>
          </div>
          <div className="col-lg-3 mt-2  mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Serach"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cat_ID</th>
              <th scope="col">Category_Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
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
                <td>
                  <a className="btn btn-warning" href={`/edit_category/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(posts._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Category</a></button>

        &nbsp;
        &nbsp;
        
        <button className="btn btn-danger"><a href="/Report" style={{textDecoration:'none',color:'white'}}>Generate Category Report</a></button>

      </div>
    )
  }
}