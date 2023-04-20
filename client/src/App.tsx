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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <PrimarySearchAppBar/>
        <Routes>
          <Route index path="/*" element={<Home />} />
          <Route path="/video/:videoID" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
