import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment"
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { render } from "react-dom";
import { scaleBand, scaleLinear } from "@devexpress/dx-chart-core";
import { ArgumentScale, Stack, ValueScale } from "@devexpress/dx-react-chart";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';


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

export default class SalesChart extends Component {

    constructor(props) {
        super(props);

        this.deleteSale = this.deleteSale.bind(this)
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
        axios.get('http://localhost:5000/sales/sales')
            .then(response => {
                this.setState({
                    sales: response.data.document,
                    sales: response.data.document,
                })
            })
            .catch((error) => {
                console.log(error);
            })
        setTimeout(() => {
        }, 2000);
    }

    numberWithCommas = (x) => {
        const value = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value;
    }

    deleteSale(id) {
        axios.delete('http://localhost:5000/sales/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            sales: this.state.sales.filter(el => el._id !== id)
        })
    }

    saleList() {
        return this.state.sales.map(currentsale => {
            return <Sale sale={currentsale} deleteSale={this.deleteSale} key={currentsale._id} />;
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
        return (
            <div
                class="bg_image"
            >
                <div className="container">
                    <div style={{ width: '100%', backgroundColor: 'white', marginTop: "10%" }}>
                        <div class="row">
                            <div class="col-3">
                                <h3 className="text">Sale Chart</h3>
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

                                <FormControl style={{ width: '20%', marginLeft: '4%' }}>
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
                                
                            </div>
                        </div>
                        <Chart data={this.state.selectedForReport}>
                            <ArgumentScale factory={scaleBand} />
                            {/* <ValueScale factory={() => this.scale} /> */}

                            <ArgumentAxis />

                            <ValueAxis />

                            <BarSeries valueField="quantity" argumentField={'itemname'} name="Series 1" />

                            <Stack />
                        </Chart>
                    </div>
                </div>
            </div>
        )
    }



}