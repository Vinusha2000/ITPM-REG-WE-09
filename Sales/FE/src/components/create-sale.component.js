import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ItemCard from '../subComponents/ItemCard/ItemCard';
import { height } from '@mui/system';
import * as Utils from "../utils/constants"
import { invalid } from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const arr = [
  {
      "_id": "61486271ccb587f3c82b7488",
      "itemCode": "I001",
      "itemName": "Kotmale Full Cream Milk UHT - 1.00 l",
      "itemDescription": "Full Cream Milk Uht",
      "itemPrice": 280,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV13703_1.png"
  },
  {
      "_id": "61486ffeccb587f3c82b748b",
      "itemCode": "I002",
      "itemName": "Newdale Set Plain Yoghurt - 80.00 g",
      "itemDescription": "Set Yoghurt Plain",
      "itemPrice": 45,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/DYD3020_1.png"
  },
  {
      "_id": "61487ed1ccb587f3c82b748c",
      "itemCode": "I003",
      "itemName": "Diva Flowers Rose & Lime",
      "itemDescription": "Laundry Detergent Powder",
      "itemPrice": 185,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/HH19326_1.png"
  },
  {
      "_id": "61488006ccb587f3c82b748d",
      "itemCode": "I004",
      "itemName": "Highland Full Cream Milk Powder - 400.00 g",
      "itemDescription": "Full Cream Milk Powder",
      "itemPrice": 380,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV00201_1.png"
  },
  {
      "_id": "61488093ccb587f3c82b748f",
      "itemCode": "I005",
      "itemName": "Anchor Butter Unsalted - 227.00 g",
      "itemDescription": "Butter Unsalted",
      "itemPrice": 680,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/DYD3026_1.png"
  },
  {
      "_id": "614880d9ccb587f3c82b7490",
      "itemCode": "I006",
      "itemName": "Lysol Floral Disinfectant - 950.00 ml",
      "itemDescription": "Disinfectant",
      "itemPrice": 395,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/HH37013_1.png"
  },
  {
      "_id": "61488239ccb587f3c82b7491",
      "itemCode": "I007",
      "itemName": "Nestomalt Pouch - 600.00 g",
      "itemDescription": "Malted Milk Powder",
      "itemPrice": 525,
      "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV30105_1.png"
  },
  {
    "_id": "61486271ccb587f3c82b7488",
    "itemCode": "I001",
    "itemName": "Kotmale Full Cream Milk UHT - 1.00 l",
    "itemDescription": "Full Cream Milk Uht",
    "itemPrice": 280,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV13703_1.png"
},
{
    "_id": "61486ffeccb587f3c82b748b",
    "itemCode": "I002",
    "itemName": "Newdale Set Plain Yoghurt - 80.00 g",
    "itemDescription": "Set Yoghurt Plain",
    "itemPrice": 45,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/DYD3020_1.png"
},
{
    "_id": "61487ed1ccb587f3c82b748c",
    "itemCode": "I003",
    "itemName": "Diva Flowers Rose & Lime",
    "itemDescription": "Laundry Detergent Powder",
    "itemPrice": 185,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/HH19326_1.png"
},
{
    "_id": "61488006ccb587f3c82b748d",
    "itemCode": "I004",
    "itemName": "Highland Full Cream Milk Powder - 400.00 g",
    "itemDescription": "Full Cream Milk Powder",
    "itemPrice": 380,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV00201_1.png"
},
{
    "_id": "61488093ccb587f3c82b748f",
    "itemCode": "I005",
    "itemName": "Anchor Butter Unsalted - 227.00 g",
    "itemDescription": "Butter Unsalted",
    "itemPrice": 680,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/DYD3026_1.png"
},
{
    "_id": "614880d9ccb587f3c82b7490",
    "itemCode": "I006",
    "itemName": "Lysol Floral Disinfectant - 950.00 ml",
    "itemDescription": "Disinfectant",
    "itemPrice": 395,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/HH37013_1.png"
},
{
    "_id": "61488239ccb587f3c82b7491",
    "itemCode": "I007",
    "itemName": "Nestomalt Pouch - 600.00 g",
    "itemDescription": "Malted Milk Powder",
    "itemPrice": 525,
    "itemImg": "https://cargillsonline.com/VendorItems/MenuItems/BV30105_1.png"
}
]

export default class CreateSales extends Component {
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
    axios.get('http://localhost:5000/list/lists')
      .then(response => {
        console.log("Res ***** ", response);
        this.setState({ newArr: response.data.document })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeItemname(e) {

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
        itemname: this.state.itemname,
        description: this.state.description,
        quantity: this.state.quantity,
        price: this.state.price,
        date: this.state.date
      }

      console.log(sale);

      axios.post('http://localhost:5000/sales/add', sale)
        .then(res => {
          toast.success('Sale Created Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }).catch(err => {
          toast.error('Sale Created Failed', {
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

  itemSelected = (data) => {
    console.log("sasasasasa", data);
    this.setState({
      itemname: data.itemName,
      price: data.itemPrice
    })
  }

  numberWithCommas = (x) => {
    const value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
  }

  render() {
    return (
      <div
        class="bg_image"
      >
        <div className="container">
          <ToastContainer />
          <h3 className="text">Create a New Sale</h3>

          <div className="row">
            <ItemCard
              data={this.state.newArr}
              selectedItem={(data) => this.itemSelected(data)}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{ marginTop: "30px" }}>
              <label className="text">Description: </label>
              <input type="text"
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

            <div style={{ marginTop: "30px", display: 'flex', flexDirection: 'row' }}>
              <h2 className="text">Total amount : </h2>
              <h2 className="text">{this.numberWithCommas(this.state.quantity * this.state.price)}</h2>
            </div>

            <div className="form-group" style={{ marginTop: "30px", marginBottom: "50px" }}>
              <input type="submit" value="Create a Sale" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const dataArr = [
  {
    "itemName": "ASI",
    "des": "ASI",

  },
  {
    "itemName": "ABC",
    "des": "ABC"
  },
]