import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../withRouter';

class ItemDetails extends Component {
  constructor(props) {
    super(props);

    this.state={
      post:{}
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    console.log(id)

    axios.get(`/item/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          post:res.data.post
        });

        console.log(this.state.post);
      }
    });
  }

  render() {

    const {Item_ID,Item_Name,Brand_Name,Category,Quality_Assurance,Unit_Price,Unit_Profit} = this.state.post;

    return (
      <div style={{marginTop:'30px'}}>
        <h4>{Item_ID}</h4>
        <hr/>

        <div className='bg-success p-2 text-dark bg-opacity-10'>
          <dl className="row">
            <dt className="col-sm-3">Item_ID</dt>
            <dt className="col-sm-9">{Item_ID}</dt>
            <br></br>

            <dt className="col-sm-3">Item_Name</dt>
            <dt className="col-sm-9">{Item_Name}</dt>
            <br></br>

            <dt className="col-sm-3">Brand_Name</dt>
            <dt className="col-sm-9">{Brand_Name}</dt>
            <br></br>

            <dt className="col-sm-3">Category</dt>
            <dt className="col-sm-9">{Category}</dt>
            <br></br>

            <dt className="col-sm-3">Quality_Assurance</dt>
            <dt className="col-sm-9">{Quality_Assurance}</dt>
            <br></br>

            <dt className="col-sm-3">Unit_Price</dt>
            <dt className="col-sm-9">{Unit_Price}</dt>
            <br></br>

            <dt className="col-sm-3">Unit_Profit</dt>
            <dt className="col-sm-9">{Unit_Profit}</dt>
            

          </dl>
        </div>
      </div>
    );
  }
}


export default withRouter(ItemDetails);