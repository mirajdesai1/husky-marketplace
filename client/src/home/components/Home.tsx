import { useCallback, useEffect, useState } from 'react';
import PrimarySearchAppBar from '../../navbar/components/navbar';
import SearchBar from '../../search/components/searchBar';
import youtubeAPI from '../../api/youtubeAPI';
import { Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import YTWatchPartyService, {
  IRecommendation,
} from '../../api/YTWatchPartyService';
import { useAuth0 } from '@auth0/auth0-react';

const service = new YTWatchPartyService();

const fetchPopularVideosPromise = () => {
  return youtubeAPI.get<
    GoogleApiYouTubePageInfo<GoogleApiYouTubeVideoResource>
  >('/videos', {
    params: {
      chart: 'mostPopular',
      part: 'snippet',
      maxResults: 20,
    },
  });
};

const fetchTrendingPromise = fetchPopularVideosPromise();

const Home = () => {
  const [popularVideos, setPopularVideos] = useState<
    Array<GoogleApiYouTubeVideoResource>
  >([]);
  const [recommendations, setRecommendations] = useState<
    Array<GoogleApiYouTubeVideoResource>
  >([]);

  const { getAccessTokenSilently } = useAuth0();

  const fetchData = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const getRecommendationsPromise = service.getRecommendationsPromise(token);

    const [popularVideos, recommendations] = await Promise.all([
      fetchTrendingPromise,
      getRecommendationsPromise,
    ]);
    setPopularVideos(popularVideos.data.items);

    console.log({ recommendations });
    const videoIDs = recommendations.data.map((item) => item.videoID);

    const getVideoPromises = videoIDs.map((videoID) =>
      service.getVideoPromise(videoID)
    );

    const recommendedVideos = (await Promise.all(getVideoPromises)).map(
      (item) => item.data.items[0]
    );

    setRecommendations(recommendedVideos);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <Typography variant="h4" textAlign={'left'} fontFamily={'sans-serif'}>
        Popular Videos
      </Typography>
      <hr></hr>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          //justifyContent: 'space-around',
          overflowY: 'scroll',
          whiteSpace: 'inherit',
          marginBottom: '32px',
        }}
      >
        {popularVideos.map((searchResult: any) => {
          return (
            <div>
              <Link to={`/video/${searchResult.id}`}>
                <img
                  style={{
                    objectFit: 'cover',
                    borderRadius: '5%',
                    marginRight: '30px',
                  }}
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
      <Typography variant="h4" textAlign={'left'} fontFamily={'sans-serif'}>
        Recommended Videos
      </Typography>
      <hr></hr>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          //justifyContent: 'space-around',
          overflowY: 'scroll',
          whiteSpace: 'inherit',
        }}
      >
        {recommendations.map((recommendation) => {
          return (
            <div>
              <Link to={`/video/${recommendation.id}`}>
                <img
                  style={{
                    objectFit: 'cover',
                    borderRadius: '5%',
                    marginRight: '30px',
                  }}
                  width={150}
                  height={150}
                  alt="video"
                  src={recommendation.snippet.thumbnails.high.url}
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
