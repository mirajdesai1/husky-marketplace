import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import YTWatchPartyService, { IUserPublicProfile } from "../api/YTWatchPartyService";
import Friend from "./Friend";

const service = new YTWatchPartyService();

function FriendsTab() {
  const { getAccessTokenSilently } = useAuth0();
  const [ friends, setFriends ] = useState<Array<IUserPublicProfile>>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = await getAccessTokenSilently()
      setFriends(await service.getFriendInvites(token));
    }

    fetchFriends().catch((e) => console.log(e));
  }, [getAccessTokenSilently])

  const acceptInvite = async (friendUsername: string) => {
    const token = await getAccessTokenSilently();
    await service.acceptFriendInvite(token, friendUsername);
    setFriends(friends.filter((f) => f.username !== friendUsername))
  }

  return (
    <>
      <ul className="list-group list-group-horizontal flex-fill">
        {friends.map((f) =>
        <li className="list-group-item">
          <Friend profile={f} />
          <button
            type="button"
            className="btn btn-primary mt-1"
            onClick={() => acceptInvite(f.username)}
          >
            Accept Invite
          </button>
        </li>)}
      </ul>
    </>
  );
}

export default FriendsTab;