import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state ={progress: 0}

  setProgress = (progress) =>{
    this.setState({progress : progress})
  }

  userCountry = "in"
  pageSize = 9
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    
    return (
      <>
      
<BrowserRouter>
<LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
  <NavBar />
<Routes>
<Route exact path="/" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="general" pageSize={this.pageSize} country={this.userCountry} category="general"/>}  />
<Route exact path="/science" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Science" pageSize={this.pageSize} country={this.userCountry} category="Science"/>}  />
<Route exact path="/business" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Business" pageSize={this.pageSize} country={this.userCountry} category="Business"/>}  />
<Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Entertainment" pageSize={this.pageSize} country={this.userCountry} category="Entertainment"/>}  />
<Route exact path="/general" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="General" pageSize={this.pageSize} country={this.userCountry} category="General"/>}  />
<Route exact path="/health" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Health" pageSize={this.pageSize} country={this.userCountry} category="Health"/>}  />
<Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Technology" pageSize={this.pageSize} country={this.userCountry} category="Technology"/>}  />
<Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress = {this.setProgress} key="Sports" pageSize={this.pageSize} country={this.userCountry} category="Sports"/>}  />
</Routes>
</BrowserRouter></>
    )
  }
}

