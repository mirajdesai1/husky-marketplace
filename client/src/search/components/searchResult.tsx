import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import youtubeAPI from '../../api/youtubeAPI';
import YouTubeVideo from '../../components/YouTubeVideo';

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
    <div className="text-start mt-2">
        <ul className="list-group list-group-horizontal flex-fill row row-cols-auto">
          {searchResults.map((v) => {
            return (
              <li className="list-group-item border-0 col">
                <YouTubeVideo video={v} />
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default SearchResult;
