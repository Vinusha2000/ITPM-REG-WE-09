import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../withRouter';


const initialState = {
  Item_ID:"",
  Item_Name:"",
  Brand_Name:"",
  Category:"",
  Quality_Assurance:"",
  Unit_Price:"",
  Unit_Profit:"",
  Brand_NameError:"",
  Quality_AssuranceError:"",
  Unit_PriceError:"",
};

class EditItem extends Component {

  state = initialState;
     
    constructor(props){
        super(props);
        this.state={
            Item_ID:"",
            Item_Name:"",
            Brand_Name:"",
            Category:"",
            Quality_Assurance:"",
            Unit_Price:"",
            Unit_Profit:"",

            Brand_NameError:"",
            Quality_AssuranceError:"",
            Unit_PriceError:"",
        };
    }

    handleInputChange= (e)=>{
        const{name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    //validation
    validate = () => {
        let Brand_NameError = "";
        let Quality_AssuranceError = "";
        let Unit_PriceError = "";


        if(!this.state.Brand_Name) {
            Brand_NameError = "This field is required!!!";
        }

        if(!this.state.Quality_Assurance) {
            Quality_AssuranceError = "This field is required!!!";
        }

        if(!this.state.Unit_Price) {
            Unit_PriceError = "This field is required!!!";
        }

        if(Brand_NameError || Quality_AssuranceError || Unit_PriceError ) {
            this.setState({ Brand_NameError,Quality_AssuranceError,Unit_PriceError});
            return false;
        }
        return true;
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const id = this.props.params.id;

        const {Item_ID,Item_Name,Brand_Name,Category,Quality_Assurance,Unit_Price,Unit_Profit} = this.state;

        const data = {
            Item_ID:Item_ID,
            Item_Name:Item_Name,
            Brand_Name:Brand_Name,
            Category:Category,
            Quality_Assurance:Quality_Assurance,
            Unit_Price:Unit_Price,
            Unit_Profit:Unit_Profit
        };

        console.log(data);

        //validation
        const isValid = this.validate();
        if(isValid) {
            console.log(data);
            this.setState(initialState);
        }

        axios.put(`/item/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Item Update Successfully!!")
                window.location.replace("/")
                
            }
        })
    }


    componentDidMount() {
      const id = this.props.params.id;
      
  
      axios.get(`/item/${id}`).then((res) =>{
        if(res.data.success){
          this.setState({
            Item_ID:res.data.post.Item_ID,
            Item_Name:res.data.post.Item_Name,
            Brand_Name:res.data.post.Brand_Name,
            Category:res.data.post.Category,
            Quality_Assurance:res.data.post.Quality_Assurance,
            Unit_Price:res.data.post.Unit_Price,
            Unit_Profit:res.data.post.Unit_Profit
          });
  
          console.log(this.state.post);
        }
      });
    }


  render() {
    return (
            <div className="col-md-8 mt-4 mx-auto" style={{minHeight:"700px"}}>
                <b><h1 className="h3 mb-3 font-weight-normal">Update Item</h1></b>
                <form className="needs-validation" noValidation>
                    <div style={{background:"hsl(180,60%,25%,0.9)",padding:"20px"}}>
                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px'}}>Item_ID</label>
                        <input type="text"
                        className="form-control"
                        name="Item_ID"
                        placeholder="Enter Item_ID"
                        value={this.state.Item_ID}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Item_Name</label>
                        <input type="text"
                        className="form-control"
                        name="Item_Name"
                        placeholder="Enter Item_Name"
                        value={this.state.Item_Name}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Brand_Name</label>
                        <input type="text"
                        className="form-control"
                        name="Brand_Name"
                        placeholder="Enter Brand_Name"
                        value={this.state.Brand_Name}
                        onChange={this.handleInputChange}/>
                        <div style={{fontSize:16, color: "red"}}>
                            {" "}
                            {this.state.Brand_NameError}{" "}
                        </div>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Category</label>
                        
                        <select className="form-select"
                        name="Category"
                        value={this.state.Category}
                        onChange={this.handleInputChange}>
                            <option selected>Select Category</option>
                            <option>Buscuit</option>
                            <option>Soft Drinks</option>
                            <option>Food</option>
                            <option>Ice-Cream</option>
                            <option>Noodles</option>
                            <option>Yoghurt</option>
                            <option>Other</option>
                            {/* <option></option>
                            <option>Three</option> */}
                        </select>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Quality_Assurance</label>
                        <input type="text"
                        className="form-control"
                        name="Quality_Assurance"
                        placeholder="Enter Quality_Assurance"
                        value={this.state.Quality_Assurance}
                        onChange={this.handleInputChange}/>
                        <div style={{fontSize:16, color: "red"}}>
                            {" "}
                            {this.state.Quality_AssuranceError}{" "}
                        </div>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Unit_Price</label>
                        <input type="text"
                        className="form-control"
                        name="Unit_Price"
                        placeholder="Enter Unit_Price"
                        value={this.state.Unit_Price}
                        onChange={this.handleInputChange}/>
                        <div style={{fontSize:16, color: "red"}}>
                            {" "}
                            {this.state.Unit_PriceError}{" "}
                        </div>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px"}}>
                        <label style={{marginBottom:'5px',color:"white"}}>Unit_Profit</label>
                        <input type="text"
                        className="form-control"
                        name="Unit_Profit"
                        placeholder="Enter Unit_Profit"
                        value={this.state.Unit_Profit}
                        onChange={this.handleInputChange}/>
                    </div>

                    <center><button className="btn btn-danger" type="submit" style={{marginTop:'15px',width:"40%"}} onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Update
                    </button> </center>
                    </div>
                </form>
                &nbsp;
            </div>
        );
    }
  }


export default withRouter(EditItem);