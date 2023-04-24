import React from "react";
import { Link } from "react-router-dom";

function YouTubeVideo({ video }: { video: GoogleApiYouTubeVideoResource }) {
  return (
    <Link to={`/video/${video.id}`} className="text-decoration-none">
      <img
        style={{
          objectFit: "cover",
          borderRadius: "5%",
          marginRight: "30px",
        }}
        width={300}
        height={175}
        alt="video"
        src={(video as any).snippet.thumbnails.high.url}
      ></img>
      <div className="text-dark h5 text-truncate m-0" style={{ maxWidth: 300 }}>
        {video.snippet.title}
      </div>
      <div className="text-muted">{video.snippet.channelTitle}</div>
      <div className="text-muted">
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
          video.statistics.viewCount
        )} views &middot; {new Date(video.snippet.publishedAt).toDateString()}
      </div>
    </Link>
  );
}

export default YouTubeVideo;
