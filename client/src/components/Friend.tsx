import React from "react";
import { Link } from "react-router-dom";
import { IUserPublicProfile } from "../api/YTWatchPartyService";

function Friend({profile}: {profile: IUserPublicProfile}) {
  return (
    <>
      <div className="d-flex">
        <Link to={`/profile/${profile.username}`}>
          <img src={profile.picture} alt="friend" width={50} height={50}></img>
        </Link>
        <Link to={`/profile/${profile.username}`}>
          <div className="text-start ms-1">
            <div>{profile.name}</div>
            <div className="text-muted">@{profile.username}</div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Friend;