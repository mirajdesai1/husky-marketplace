import * as React from 'react';

import { useCallback, useState } from 'react';
import youtubeAPI from '../../api/youtubeAPI';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <Link to={`search/${encodeURI(searchTerm)}`}>
        <button>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
