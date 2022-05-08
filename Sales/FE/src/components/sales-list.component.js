import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment"
import TextField from '@mui/material/TextField';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import AlertDialog from "../subComponents/AlertDialog/AlertDialog"
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from 'react-modal';

const Sale = props => (
  <tr>
    <td>{props.sale.itemname}</td>
    <td>{props.sale.description}</td>
    <td>{props.sale.quantity}</td>
    <td>{props.sale.price}</td>
    <td>{(props.sale.quantity * props.sale.price)}</td>
    <td>{moment(props.sale.date).format('DD MMMM YY')}</td>
    <td>
      <Link to={"/edit/" + props.sale._id}>  <button class="btn btn-warning" >Edit </button></Link>  <a href="#" onClick={() => { props.deleteSale(props.sale._id) }}><button class="btn btn-danger" >Delete </button></a>
    </td>
  </tr>
)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '40%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const bottomModal = {
  content: {
    top: '85%',
    position: 'fixed',
    bottom: 30,
    left: '50%',
    width: '40%',
    height: '60px',
    transform: 'translate(-50%)',
  }
}

export default class SalesList extends Component {

  constructor(props) {
    super(props);

    this.deleteSale = this.deleteSale.bind(this)
    this.search = this.search.bind(this)
    this.state = {
      sales: [],
      filter: "",
      allSales: [],
      openDeleteModal: false,
      selectedSale: null,
      openConfirmationModal: false,
      value: [null, null],
      selectedForReport: [],
      item: ''
    };
  }



  componentDidMount() {
    this.loadSales();
  }

  loadSales = () => {
    axios.get('http://localhost:5000/sales/sales')
      .then(response => {
        this.setState({
          sales: response.data.document,
          allSales: response.data.document
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  numberWithCommas = (x) => {
    const value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
  }

  deleteSale(sale) {
    console.log("sasas", sale);
    this.setState({
      selectedSale: sale
    }, () => {
      this.openDeleteModal()
    })

  }

  confirmDelete = () => {
    const sale = {
      _id: this.state.selectedSale._id,
      deleted: true
    }

    axios.post('http://localhost:5000/sales/saleDelete', sale)
      .then(res => {
        console.log("ssd", res);
        this.loadSales()
        this.closeModal()
        this.setState({
          openConfirmationModal: true
        })
      }).catch(err => {
        console.log("sasass", err);
      })
  }

  undoSale = () => {
    console.log("undo");
    const sale = {
      _id: this.state.selectedSale._id,
      deleted: false
    }

    axios.post('http://localhost:5000/sales/undoSale', sale)
      .then(res => {
        this.loadSales()
        this.closeConfirmantionModal()
      }).catch(err => {
        console.log("sasass", err);
      })
  }

  saleList() {
    return this.state.sales.map(currentsale => {
      return <Sale sale={currentsale} deleteSale={() => this.deleteSale(currentsale)} key={currentsale} />;
    })
  }

  search(e) {
    this.setState(
      {

        filter: e.target.value
      }, () => {
        let filteredSales = this.state.allSales.filter((sale) => {
          if (this.state.filter != "") {
            console.log("%%%", this.state.filter)
            return sale.itemname.indexOf(this.state.filter) != -1;

          }

        })

        if (e.target.value != "") {
          this.setState({
            sales: filteredSales
          })
        }
        else {

          this.setState({
            sales: this.state.allSales
          })
        }


      }
    );
  }

  openDeleteModal = () => {
    this.setState({
      openDeleteModal: true
    })
  }

  afterOpenModal = () => {
    // this.setState({
    //   openDeleteModal: true
    // })
  }

  closeModal = () => {
    this.setState({
      openDeleteModal: false
    })
  }

  closeConfirmantionModal = () => {
    this.setState({
      openConfirmationModal: false
    })
  }

  handleItemChange = (e) => {
    this.setState({
      item: e.target.value
    },()=> {
      let itemArr = this.state.sales.filter(a => {
        return a.itemname == this.state.item;
      });
      this.setState({
        selectedForReport: itemArr
      })
    })
  }

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    return (
      <div
        class="bg_image"
      >
        <div className="container">
          <Modal
            isOpen={this.state.openDeleteModal}
            onAfterOpen={() => this.afterOpenModal()}
            onRequestClose={() => this.closeModal()}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <div style={{ flex: 1, backgroundColor: 'gray', padding: '5%' }}>
                <h3>Confirm Delete</h3>
              </div>
              <div style={{ padding: '5%' }}>
                <h4>Are you sure you want to delete this sale?</h4>
              </div>
              <div style={{ paddingLeft: '5%', display: 'flex', flexDirection: 'row' }}>
                <h4>{this.state.selectedSale ? this.state.selectedSale.itemname : ""}</h4>
                <h4 style={{ paddingLeft: '5%', color: 'gray' }}>{this.state.selectedSale ? "LKR " + this.state.selectedSale.price : ""}</h4>
              </div>
              <div style={{ padding: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <button class="btn" style={{ backgroundColor: 'gray', marginRight: '5%' }} onClick={() => this.closeModal()} >Cancel </button>
                <button class="btn btn-danger" onClick={() => this.confirmDelete()} >Delete </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.openConfirmationModal}
            onRequestClose={() => this.closeConfirmantionModal()}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <div style={{ flex: 1, backgroundColor: 'gray', padding: '5%' }}>
                <h3>Delete Confirmation</h3>
              </div>
              <div style={{ padding: '5%' }}>
                <h4>Sale has been successfully deleted!</h4>
              </div>
              <div style={{ padding: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>

                <button class="btn" style={{ backgroundColor: 'gray', marginRight: '5%' }} onClick={() => this.closeConfirmantionModal()} >Close </button>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.openConfirmationModal}
            onRequestClose={() => this.closeConfirmantionModal()}
            style={bottomModal}
            contentLabel="Example Modal"
          >
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h4>1 Deleted</h4>
                <button class="btn" style={{ backgroundColor: 'gray', marginRight: '5%', height: '30px' }} onClick={() => this.undoSale()} >UNDO </button>
              </div>
            </div>
          </Modal>
          <div class="row">
            <div class="col-3">
              <h3 className="text">Logged Sales</h3>
            </div>
            {/* <AlertDialog /> */}
            <div
              class="col-9"
              style={{ float: "right", display: 'flex', flexDirection: 'row' }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={this.state.value}
                  onChange={(newValue) => {
                    this.setState({
                      value: newValue
                    }, () => {
                      console.log("sales", this.state.sales);
                      var resultProductData = this.state.sales.filter(a => {
                        var date = new Date(a.date);
                        return (date >= this.state.value[0] && date <= this.state.value[1]);
                      });
                      this.setState({
                        selectedForReport: resultProductData
                      })
                      console.log("asasasas", resultProductData);
                      // console.log("date" , this.state.value.map(date => {
                      //   return new Date(moment(date).format('DD-MM-YYYY'))
                      // }));
                    })
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> - </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>

              <FormControl style={{width:'20%' , marginLeft:'4%'}}>
                <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.item}
                  label="Item Name"
                  onChange={(e) => this.handleItemChange(e)}
                >
                 {this.state.sales && this.state.sales[0] ? this.state.sales.map(item => {
                   return (
                    <MenuItem value={item.itemname}>{item.itemname}</MenuItem>
                   )
                 }) : null}
                </Select>
              </FormControl>
              <button class="btn" style={{ backgroundColor: '#0E4D90', marginRight: '5%', marginLeft: '3%', color: 'white' }} onClick={() => this.exportPDF()} >Generate Report </button>
            </div>
          </div>
          <div class="row" style={{ marginTop: '30px' }}>
            <div class="col-8">
            </div>
            {/* <AlertDialog /> */}
            <div
              class="col-4"
              style={{ float: "right", height: "80px" }}
            >
              <TextField
                id="outlined-basic"
                label="Search Name"
                variant="outlined"
                size="small"
                onChange={this.search}
              />
            </div>
          </div>

          <table class="table table-bordered">
            <thead style={{ backgroundColor: '#EAEAEA' }}>
              <tr>
                <th>Item name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.saleList()}
            </tbody>
          </table>
          {/* <div>
            <button class="btn btn-primary" onClick={() => this.exportPDF()}>Generate Report</button>
          </div> */}

        </div>
      </div>
    )
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);



    doc.setFontSize(15);

    const title = "Sunrise Supermarket";
    const headers = [["Item Name", "Description", "Quantity", "Price", "Total Amount", "date"]];

    let totAmount = 0
    this.state.selectedForReport.forEach(item => {
      totAmount = totAmount + (item.price * item.quantity)
    })

    const data = this.state.selectedForReport.map(elt => [elt.itemname, elt.description, elt.quantity, elt.price, this.numberWithCommas(elt.price * elt.quantity), moment(elt.date).format('DD MMM YY, h:mm A')]);

    let content = {
      startY: 90,
      head: headers,
      body: data
    };

    const price = "Total Amount : " + this.numberWithCommas(totAmount)

    doc.text(title, marginLeft, 40);
    doc.text(price, marginLeft, 70)
    doc.autoTable(content);
    doc.save("Sales report.pdf")
  }


}