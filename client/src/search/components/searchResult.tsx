import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import youtubeAPI from '../../api/youtubeAPI';

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { searchTerm } = useParams();

  useEffect(() => {
    youtubeAPI
      .get('/search', {
        params: {
          q: searchTerm,
          part: 'snippet',
          maxResults: 20,
        },
      })
      .then((resp) => {
        setSearchResults(resp.data.items);
      })
      .catch((e) => console.log(e));
  }, [searchTerm]);


  const renderVideoInfo = () => {

  }

  return (
    <div>
      {searchResults.map((searchResult: any, index) => {
        return (
            <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Link to={`/video/${searchResult.id.videoId}`}>
              <img
                width="480"
                height="360"
                alt="video"
                src={(searchResult as any).snippet.thumbnails.high.url}
              ></img>
            </Link>
            </div>
            <div>
                <h2>{searchResult.snippet.title}</h2>
            </div>
            </div>
          
        );
      })}
    </div>
  );
};

export default SearchResult;
