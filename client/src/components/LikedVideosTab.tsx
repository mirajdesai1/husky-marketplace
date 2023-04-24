import React, { useEffect, useState } from "react";
import YTWatchPartyService from "../api/YTWatchPartyService";
import YouTubeVideo from "./YouTubeVideo";
import { useAuth0 } from "@auth0/auth0-react";

const service = new YTWatchPartyService();

function LikedVideosTab() {
  const [videos, setVideos] = useState<Array<GoogleApiYouTubeVideoResource>>(
    []
  );
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchVideos = async () => {
      const token = await getAccessTokenSilently();
      const likedVideos = await service.getLikedVideos(token);
      return likedVideos;
    };
    fetchVideos().then(likedVideos => setVideos(likedVideos)).catch((e) => console.log(e));
  }, [getAccessTokenSilently]);

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
