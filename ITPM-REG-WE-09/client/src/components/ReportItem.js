import React, { Component, Components } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';

export default class AllItem extends Component {
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
        axios.get("/item").then(res =>{
            if(res.data.success){
                this.setState({
                    posts:res.data.existingItem
                });

                console.log(this.state.posts)
            }
        });
    }

    render() {
        return (
            <div className="container1">
                <h2>Do You want to get a Report?</h2>
                <h2><center>All Item Details</center></h2>

                <ReactToPrint trigger={() => (
                    <button
                    type="button"
                    class="btn btn-danger"
                    style={{marginInlineStart: "0%"}}>
                        <i class="fas fa-print mr-2">Print This out!</i>
                    </button>
                )}
                content={() => this.componentRef}/>

                <table className="table table-success table-striped" style={{marginTop:'40px'}} ref={(Component) => (this.componentRef = Component)}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((posts,index) => (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>
                                    <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                                    {posts.Item_ID}
                                    </a>
                                </td>
                                <td>{posts.Item_Name}</td>
                                <td>{posts.Brand_Name}</td>
                                <td>{posts.Category}</td>
                                <td>{posts.Quality_Assurance}</td>
                                <td>{posts.Unit_Price}</td>
                                <td>{posts.Unit_Profit}</td>
                            </tr>
                            
                        ))}

                    </tbody>
                </table>
            </div>
        );
    }

}