import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Home from './home/components/Home';
import VideoDetail from './videoDetails/components/videoDetail';
import SearchResult from './search/components/searchResult';
import PrimarySearchAppBar from './navbar/components/navbar';
import PermanentDrawerLeft from './navbar/components/sidebar';
import PublicProfile from './components/PublicProfile';
import UserProfile from './components/UserProfile';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <PrimarySearchAppBar/> */}
      <PermanentDrawerLeft/>
      {/* <PrimarySearchAppBar/> */}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
