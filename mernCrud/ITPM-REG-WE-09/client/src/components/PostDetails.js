import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from '../withRouter';

class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state={
      post:{}
    };
  }

  componentDidMount() {
    
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

  render() {
    
    const {Cat_ID,Category_Name,Description} = this.state.post;

    return(
      <div style={{marginTop:'30px'}}>
        <h4>{Cat_ID}</h4>
        <hr/>

        <div className='bg-success p-2 text-dark bg-opacity-10'>
          <dl className="row">
            <dt className="col-sm-3">Cat_ID</dt>
            <dd className="col-sm-9">{Cat_ID}</dd>
            <br></br>

            <dt className="col-sm-3">Category_Name</dt>
            <dd className="col-sm-9">{Category_Name}</dd>
            <br></br>
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">{Description}</dd>

          </dl>
        </div>
      </div>
    )
  }
}


export default withRouter(PostDetails);