import React, { Component } from 'react';
import axios from 'axios';

class AllItem extends Component {
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
    axios.get("/item").then(res => {
        if(res.data.success){
            this.setState({
                posts:res.data.existingItem

            });

            console.log(this.state.posts)
        }
    });
}

onDelete = (id) =>{

    axios.delete(`/item/delete/${id}`).then((res) =>{
      alert("Delete Item Successfully");
      window.location.replace("/")
      this.retrievePosts();
    })

  }


filterData(posts,searchKey){

    const result = posts.filter((post) =>
    post.Item_ID.toLowerCase().includes(searchKey) ||
    post.Item_Name.toLowerCase().includes(searchKey) ||
    post.Brand_Name.toLowerCase().includes(searchKey) ||
    post.Category.toLowerCase().includes(searchKey) ||
    post.Quality_Assurance.toLowerCase().includes(searchKey) ||
    post.Unit_Price.toLowerCase().includes(searchKey) ||
    post.Unit_Profit.toLowerCase().includes(searchKey)
    )

    this.setState({posts:result})

  }

  handleSearchArea = (e) =>{

    const searchKey= e.currentTarget.value;

    axios.get("/item").then(res =>{
      if(res.data.success){
        
        this.filterData(res.data.existingItem,searchKey)
      }

    });

  }



render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-9 mt-2 mb-2">
                    <h4>All Item Details</h4>

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
                        <th scope="col">Item_ID</th>
                        <th scope="col">Item_Name</th>
                        <th scope="col">Brand_Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quality_Assurance</th>
                        <th scope="col">Unit_Price</th>
                        <th scope="col">Unit_Profit</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map((posts,index) => (
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>
                            <a href={`/item/${posts._id}`} style={{textDecoration:'none'}}>
                            {posts.Item_ID}
                            </a>
                            </td>
                            <td>{posts.Item_Name}</td>
                            <td>{posts.Brand_Name}</td>
                            <td>{posts.Category}</td>
                            <td>{posts.Quality_Assurance}</td>
                            <td>{posts.Unit_Price}</td>
                            <td>{posts.Unit_Profit}</td>
                            <td>
                                <a className="btn btn-warning" href={`/edit_item/${posts._id}`}>
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
            <button className="btn btn-success"><a href="/add_item" style={{textDecoration:'none',color:'white'}}>Create New Item</a></button>

            &nbsp;
            &nbsp;
        
            <button className="btn btn-danger"><a href="/report_item" style={{textDecoration:'none',color:'white'}}>Generate Item Report</a></button>

        </div>
    );
}

}

export default AllItem;