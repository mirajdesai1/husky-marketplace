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
import PublicProfile from './components/PublicProfile';
import UserProfile from './components/UserProfile';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <PrimarySearchAppBar/>
        <Routes>
          <Route index path="/*" element={<Home />} />
          <Route path="/video/:videoID" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
          <Route path="/profile" Component={withAuthenticationRequired(UserProfile)} />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route path="/profile/:username/pending" element={<UserProfile active='pending' />} />
          <Route path="/profile/:username/featured" element={<UserProfile active='featured' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
