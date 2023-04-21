import React from 'react';
import './App.css';
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
