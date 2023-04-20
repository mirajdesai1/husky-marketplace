import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SearchBar from './search/components/searchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <SearchBar/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube Watch Party
        </a>
        <Login />
      </header>
    </div>
  );
}

export default App;
