import React, { Component } from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import AddItem from './components/AddItem';
import AllItem from './components/AllItem';
import Category from './components/Category';
import CreatePost from './components/CreatePost';
import EditItem from './components/EditItem';
import EditPost from './components/EditPost';
import NavBar from './components/NavBar';
import PostDetails from './components/PostDetails';
import ReportCategory from './components/ReportCategory';
import ReportItem from './components/ReportItem';
import ItemDetails from './components/ItemDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="container">
        <NavBar/>
        <Routes>
        <Route exact path="/category" element={<Category/>}/>
        <Route exact path="/add" element={<CreatePost/>}/>
        <Route exact path="/edit_category/:id" element={<EditPost/>}/>
        <Route exact path="/post/:id" element={<PostDetails/>}/>
        <Route exact path="/Report" element={<ReportCategory/>}/>
        <Route exact path="/" element={<AllItem/>}/>
        <Route exect path="/add_item" element={<AddItem/>}/>
        <Route exact path="/report_item" element={<ReportItem/>}/>
        <Route exact path="/item/:id" element={<ItemDetails/>}/>
        <Route exact path="/edit_item/:id" element={<EditItem/>}/>
        </Routes>
      </div>
      
      </BrowserRouter>
    )
  }
}