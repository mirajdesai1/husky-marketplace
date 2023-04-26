import React from 'react';
import { Link } from 'react-router-dom';

function YouTubeVideo({
  video,
  recommendedBy = null,
}: {
  video: GoogleApiYouTubeVideoResource | GoogleApiYouTubeSearchResource;
  recommendedBy?: string | null
}) {
  if ('statistics' in video) {
    return (
      <Link to={`/video/${video.id}`} className="text-decoration-none">
        <img
          style={{
            objectFit: 'cover',
            borderRadius: '5%',
            marginRight: '30px',
          }}
          width={240}
          height={140}
          alt="video"
          src={(video as any).snippet.thumbnails.high.url}
        ></img>
        <div
          className="text-dark h5 text-truncate m-0"
          style={{ maxWidth: 240 }}
        >
          {video.snippet.title}
        </div>
        <div className="text-muted">{video.snippet.channelTitle}</div>
        <div className="text-muted">
          {Intl.NumberFormat('en-US', { notation: 'compact' }).format(
            video.statistics.viewCount
          )}{' '}
          views &middot; {new Date(video.snippet.publishedAt).toDateString()}
        </div>
        {recommendedBy && <div className="text-muted">
          {`Recommended by: ${recommendedBy}`}
          </div>}
      </Link>
    );
  } else {
    return (
      <Link to={`/video/${video.id.videoId}`} className="text-decoration-none">
        <img
          style={{
            objectFit: 'cover',
            borderRadius: '5%',
            marginRight: '30px',
          }}
          width={240}
          height={140}
          alt="video"
          src={(video as any).snippet.thumbnails.high.url}
        ></img>
        <div
          className="text-dark h5 text-truncate m-0"
          style={{ maxWidth: 240 }}
        >
          {video.snippet.title}
        </div>
        <div className="text-muted">{video.snippet.channelTitle}</div>
        <div className="text-muted">
          {new Date(video.snippet.publishedAt).toDateString()}
        </div>
        {recommendedBy && <div className="text-muted">
          {`Recommended by: ${recommendedBy}`}
          </div>}
      </Link>
    );
  }
}

export default YouTubeVideo;
