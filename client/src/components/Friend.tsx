import React, { useEffect, useState } from "react";
import YTWatchPartyService, { IUserPublicProfile } from "../api/YTWatchPartyService";

const service = new YTWatchPartyService();

function Friend({prof}: any) {
  return (
    <>
      <div className="d-flex">
        <img src={prof.picture} alt="friend" width={50} height={50}></img>
        <div className="text-start ms-1">
          <div>{prof.name}</div>
          <div className="text-muted">@{prof.username}</div>
        </div>
      </div>
      <button type="button" className="btn btn-primary mt-1">Accept Invite</button>
    </>
  )
}

export default Friend;