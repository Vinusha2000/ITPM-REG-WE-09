import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ItemCard from '../subComponents/ItemCard/ItemCard';
import * as Utils from "../utils/constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditSales extends Component {
  constructor(props) {
    super(props);

    this.onChangeItemname = this.onChangeItemname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      itemname: '',
      description: '',
      quantity: 0,
      price: 0,
      date: new Date(),
      newArr: [],
      invaidQuantity: false,
      invaidDes: false,
      errorMsg: "",
      errorMsgDes: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/sales/saleById' , { params: { _id: this.props.match.params.id } })
      .then(response => {
        console.log("res" , response);
        this.setState({
          itemname: response.data.document.itemname,
          description: response.data.document.description,
          quantity: response.data.document.quantity,
          price: response.data.document.price,
          date: new Date(response.data.document.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      axios.get('http://localhost:5000/items/items')
      .then(response => {
        console.log("Res ***** ", response);
        this.setState({ newArr: response.data.document })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  itemSelected = (data) => {
    console.log("sasasasasa", data);
    this.setState({
      itemname: data.itemName,
      price: data.itemPrice
    })
  }


  onChangeItemname(e) {
    this.setState({
      itemname: e.target.value
    })
  }

  onChangeDescription(e) {
    const regex = Utils.REGEX_DES;
    if (regex.test(e.target.value)) {
      this.setState({
        description: e.target.value,
        invaidDes: false,
        errorMsgDes: ""
      })
    } else if (e.target.value == "") {
      this.setState({
        description: e.target.value,
        invaidDes: true,
        errorMsgDes: "Description is mandotary"
      })
    }
    else {
      this.setState({
        description: e.target.value,
        invaidDes: true,
        errorMsgDes: "Invalid Format"
      })

    }
  }

  onChangeQuantity(e) {
    const regex = Utils.REGEX_SELL_BUY_FUNC;
    if (regex.test(e.target.value)) {
      this.setState({
        quantity: e.target.value,
        invaidQuantity: false,
        errorMsg: ""
      })
    } else if (e.target.value == "") {
      this.setState({
        quantity: e.target.value,
        invaidQuantity: true,
        errorMsg: "Quantity is mandotary"
      })
    }
    else {
      this.setState({
        quantity: e.target.value,
        invaidQuantity: true,
        errorMsg: "Invalid Format"
      })
    }

  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  numberWithCommas = (x) => {
    const value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
  }

  onSubmit(e) {
    e.preventDefault();


    if (this.state.quantity == "" && this.state.description == "") {
      this.setState({
        invaidDes: true,
        invaidQuantity: true,
        errorMsg: "Mandotary Field",
        errorMsgDes: "Mandotary Field"
      })
    } else if (this.state.quantity && this.state.description == "") {
      this.setState({
        invaidDes: true,
        invaidQuantity: false,
        errorMsg: "",
        errorMsgDes: "Mandotary Field"
      })
    } else if (this.state.quantity == "" && this.state.description) {
      this.setState({
        invaidDes: false,
        invaidQuantity: true,
        errorMsg: "Mandotary Field",
        errorMsgDes: ""
      })
    } else {
      const sale = {
        _id:this.props.match.params.id,
        itemname: this.state.itemname,
        description: this.state.description,
        quantity: this.state.quantity,
        price: this.state.price,
        date: this.state.date
      }

      axios.post('http://localhost:5000/sales/saleUpdate', sale)
        .then(res => {
          toast.success('Sale Edited Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }).catch(err => {
          toast.error('Sale Edited Failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
    }


  }

  render() {
    return (
      <div
        class="bg_image"
      >
        <div className="container">
          <h3 className="text">Edit New Sale Log</h3>
          <ToastContainer />
          <div className="row">
            <ItemCard
              data={this.state.newArr}
              selectedItem={(data) => this.itemSelected(data)}
              onEdit={true}
              onEditItem={this.state.itemname}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <label className="text">Description: </label>
              <input type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
              {this.state.invaidDes ? <h5 style={{ color: 'red' }}>{this.state.errorMsgDes}</h5> : null}
            </div>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <label className="text">Quantity : </label>
              <input
                type="text"
                className="form-control"
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
              />
              {this.state.invaidQuantity ? <h5 style={{ color: 'red' }}>{this.state.errorMsg}</h5> : null}
            </div>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <label className="text">Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div style={{ marginTop: "30px", display: 'flex', flexDirection: 'row' }}>
              <h2 className="text">Total amount : </h2>
              <h2 className="text">{this.numberWithCommas(this.state.quantity * this.state.price)}</h2>
            </div>

            <div className="form-group" style={{ marginTop: "30px", marginBottom: "50px" }}>
              <input type="submit" value="Edit a Sale" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}