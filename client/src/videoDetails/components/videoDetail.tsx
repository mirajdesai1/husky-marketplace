import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import youtubeAPI from '../../api/youtubeAPI';
import { Button, Skeleton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BasicModal from './sendFriendModal';

type VideoDetailPropType = {
  videoID: string;
};

const VideoDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState({} as any);
  const { videoID } = useParams();

  console.log({ videoInfo });
  useEffect(() => {
    console.log(videoID);
    if (videoID) {
      youtubeAPI
        .get('/videos', {
          params: {
            id: videoID,
            part: 'snippet,contentDetails,statistics',
            maxResults: 1,
          },
        })
        .then((resp) => {
          setVideoInfo(resp.data.items[0]);
        })
        .catch((e) => console.log(e));
    }
  }, [videoID]);

  const renderVideoDetails = () => {
    if (Object.keys(videoInfo).length === 0) {
      return <Skeleton />;
    }
    return (
      <>
      <div>
        <h1>{videoInfo.snippet.title}</h1>
        <h2>{`Views: ${videoInfo.statistics.viewCount}`}</h2>
        <h2>{`Likes: ${videoInfo.statistics.likeCount}`}</h2>
      </div>
      </>
    );
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <iframe
        title="Youtube watch player"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        allowFullScreen
      ></iframe>

      {renderVideoDetails()}
      <BasicModal videoID={videoID || ''}/>
    </div>
  );
};

export default VideoDetail;
