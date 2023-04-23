import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import YTWatchPartyService, {
  IUserProfile,
  IUserPublicProfile,
} from "../api/YTWatchPartyService";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./UserProfile";

const service = new YTWatchPartyService();

function PublicProfile() {
  const [profileDetails, setProfileDetails] =
    useState<IUserPublicProfile | null>(null);
  const [currUserProf, setCurrUserProf] = useState<IUserProfile | null>(null);
  const { username } = useParams();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchProfile = async () => {
      if (username) {
        setProfileDetails(await service.getPublicProfile(username));
      }
    };

    const fetchMyProfile = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        setCurrUserProf(await service.getUserProfile(token));
      }
    };
    fetchProfile().catch((e) => console.log(e));
    fetchMyProfile().catch((e) => console.log(e));
  }, [username, getAccessTokenSilently, isAuthenticated]);

  if (user?.nickname === username) {
    return <UserProfile />;
  }

  const sendInvite = async () => {
    const token = await getAccessTokenSilently();
    if (profileDetails) {
      service.sendFriendInvite(token, profileDetails.username);
    }
  };

  const removeFriend = async () => {
    const token = await getAccessTokenSilently();

    if (username) {
      if (currUserProf) {
        const newProf = {
          ...currUserProf,
          friends: currUserProf.friends.filter((f) => f !== username),
        };
        setCurrUserProf(newProf);
      }
      service.deleteFriend(token, username);
    }
  };

  const renderFriendButton = () => {
    if (isAuthenticated) {
      if (currUserProf && username) {
        if (currUserProf.friends.includes(username)) {
          return (
            <button
              type="button"
              className="btn btn-danger ms-auto align-self-baseline"
              onClick={removeFriend}
            >
              Unfriend
            </button>
          );
        }
        return (
          <button
            type="button"
            className="btn btn-primary ms-auto align-self-baseline"
            onClick={sendInvite}
          >
            Send Friend Invite
          </button>
        );
      }
    }
  };

  return (
    <>
      {profileDetails ? (
        <div className="container">
          <img
            src={profileDetails?.banner}
            width="100%"
            height="200"
            alt="profile banner"
            referrerPolicy="no-referrer"
          />
          <div className="d-flex mt-3 ms-5 me-5">
            <img
              src={profileDetails?.picture}
              className="rounded-circle"
              width="150"
              height="150"
              alt="user avatar"
              referrerPolicy="no-referrer"
            />
            <div className="ms-3 text-start w-50">
              <h3>{profileDetails?.name}</h3>
              <h5 className="text-muted">@{profileDetails?.username}</h5>
              <p className="lead">{profileDetails?.bio}</p>
            </div>
            {renderFriendButton()}
          </div>
        </div>
      ) : (
        <h1>No profile found</h1>
      )}
    </>
  );
}

export default PublicProfile;
