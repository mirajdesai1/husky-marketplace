import React from 'react';
import './App.css';
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
