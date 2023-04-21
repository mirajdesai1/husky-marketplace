import { useCallback, useEffect, useState } from 'react';
import PrimarySearchAppBar from '../../navbar/components/navbar';
import SearchBar from '../../search/components/searchBar';
import youtubeAPI from '../../api/youtubeAPI';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [popularVideos, setPopularVideos] = useState([]);

  const fetchPopularVideos = useCallback(() => {
    youtubeAPI
      .get('/search', {
        params: {
          chart: 'mostPopular',
          part: 'snippet',
          maxResults: 20,
        },
      })
      .then((resp) => {
        setPopularVideos(resp.data.items);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetchPopularVideos();

  }, [fetchPopularVideos]);

  if (!popularVideos || !popularVideos.length) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton style={{ width: 150, height: 150 }} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {popularVideos.slice(0, 6).map((searchResult: any) => {
          return (
            <div>
            <Link to={`/video/${searchResult.id.videoId}`}>
              <img
                style={{objectFit: 'cover', borderRadius: '5%'}}
                width={150}
                height={150}
                alt="video"
                src={(searchResult as any).snippet.thumbnails.high.url}
              ></img>
            </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
