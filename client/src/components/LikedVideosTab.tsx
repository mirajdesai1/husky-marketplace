import React, { useEffect, useState } from "react";
import YTWatchPartyService, { IUserProfile } from "../api/YTWatchPartyService";
import YouTubeVideo from "./YouTubeVideo";

const service = new YTWatchPartyService();

function LikedVideosTab({ userId }: { userId: string}) {
  const [videos, setVideos] = useState<Array<GoogleApiYouTubeVideoResource>>(
    []
  );

  useEffect(() => {
    const fetchVideos = async () => {
      const likedVideos = await service.getLikedVideos(userId);
      return likedVideos;
    };
    fetchVideos().then(likedVideos => setVideos(likedVideos)).catch((e) => console.log(e));
  }, [userId]);

  return (
    <>
      <div className="text-start mt-2">
        <ul className="list-group list-group-horizontal flex-fill row row-cols-auto">
          {videos.map((v) => {
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
}

export default LikedVideosTab;
