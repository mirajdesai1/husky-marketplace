import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import youtubeAPI from '../../api/youtubeAPI';
import YouTubeVideo from '../../components/YouTubeVideo';
import { Typography } from '@mui/material';


const categories = [{name: 'Hip hop music', id: '/m/0glt670'}, {name: 'Role-playing video game', id: '/m/0403l3g'}, {name: 'Cricket', id: '/m/09xp_'}, {name: 'Humor', id:'/m/09kqc'}, {name: 'Pets', id: '/m/068hy'}];
const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);


  const { searchTerm, category} = useParams();

  useEffect(() => {
    youtubeAPI
      .get('/search', {
        params: {
          q: searchTerm || '',
          part: 'snippet',
          maxResults: 20,
          topicId: categories.find(item => item.name === category)?.id || ''
        },
      })
      .then((resp) => {
        setSearchResults(resp.data.items);
      })
      .catch((e) => console.log(e));
  }, [searchTerm, category]);


  return (
    <>
    {category && <Typography variant='h5' textAlign={'left'}>{category}</Typography>}
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
      </>
  );
};

export default SearchResult;
