import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SearchBar from './search/components/searchBar';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from './home/components/Home';
import VideoDetail from './videoDetails/components/videoDetail';
import SearchResult from './search/components/searchResult';
import PrimarySearchAppBar from './navbar/components/navbar';
import PermanentDrawerLeft from './navbar/components/sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <PrimarySearchAppBar/> */}
      <PermanentDrawerLeft/>
      </BrowserRouter>
    </div>
  );
}

export default App;
