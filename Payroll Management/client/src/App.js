import React, {Component} from 'react';
import {BrowserRouter,Route,Routes } from 'react-router-dom'; 
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PostDetails from './components/PostDetails';
import Report from './components/Report';



export default class App extends Component{
    render(){
        return(
            <BrowserRouter>  
        <NavBar></NavBar>
        <Routes>     
            <Route exact path="/" element ={<Home/>}/>
            <Route exact path="/add" element ={<CreatePost/>}/>
            <Route exact path="/edit/:id" element ={<EditPost/>}/>
            <Route exact path="/post/:id" element ={<PostDetails/>}/> 
            <Route exact path="/Report" element={<Report/>}/>
            

        </Routes>
    </BrowserRouter>



           
        )
    }
}