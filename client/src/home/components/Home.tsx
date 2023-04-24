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
import YouTubeVideo from '../../components/YouTubeVideo';

const service = new YTWatchPartyService();

const fetchPopularVideosPromise = () => {
  return youtubeAPI.get<
    GoogleApiYouTubePageInfo<GoogleApiYouTubeVideoResource>
  >('/videos', {
    params: {
      chart: 'mostPopular',
      part: 'snippet, contentDetails, statistics',
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

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const fetchData = useCallback(async () => {
    let getRecommendationsPromise = null;

    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      getRecommendationsPromise = service.getRecommendationsPromise(token);
      const [popularVideos, recommendations] = await Promise.all([
        fetchTrendingPromise,
        getRecommendationsPromise,
      ]);
      setPopularVideos(popularVideos.data.items);

      const videoIDs = recommendations.data.map((item) => item.videoID);

      const getVideoPromises = videoIDs.map((videoID) =>
        service.getVideoPromise(videoID)
      );

      const recommendedVideos = (await Promise.all(getVideoPromises)).map(
        (item) => item.data.items[0]
      );

      console.log({recommendedVideos});

      setRecommendations(recommendedVideos.filter(item => !!item));
    } else {
      const [popularVideos] = await Promise.all([fetchTrendingPromise]);
      setPopularVideos(popularVideos.data.items);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

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
      <>
      <div className="text-start mt-2">
        <ul className="list-group list-group-horizontal flex-fill row row-cols-auto">
          {popularVideos.map((v) => {
            return (
              <li className="list-group-item border-0 col">
                <YouTubeVideo video={v} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
      <Typography variant="h4" textAlign={'left'} fontFamily={'sans-serif'}>
        Recommended Videos
      </Typography>
      <hr></hr>
      <div className="text-start mt-2">
        <ul className="list-group list-group-horizontal flex-fill row row-cols-auto">
          {recommendations.map((v) => {
            return (
              <li className="list-group-item border-0 col">
                <YouTubeVideo video={v} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
