import React, { useEffect, useState } from "react";
import YTWatchPartyService, { IUserProfile } from "../api/YTWatchPartyService";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import FriendsTab from "./FriendsTab";

const service = new YTWatchPartyService();

function UserProfile({active ='pending'}) {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [profileDetails, setProfileDetails] = useState<IUserProfile | null>(
    null
  );
  const [bio, setBio] = useState<string>("");


  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getAccessTokenSilently();
      const prof = await service.getUserProfile(token)
      setProfileDetails(prof);
      setBio(prof.bio);
    };

    fetchProfile().catch((e) => console.log(e));
  }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

  const bioSubmit = async () => {
    const token = await getAccessTokenSilently();
    await service.updateProfile(token, {bio});
  };

  const renderComponent = (a: string) => {
    switch(a) {
      case 'pending':
        return <FriendsTab />;
      case 'featured':
        return <></>;
      default:
        return <></>;

    }
  }

  return (
    <>
      {profileDetails
        ? <div className="container">
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
            <div className="ms-3 text-start">
              <span><span className="h3">{profileDetails.name} &middot;</span> <span className="text-muted h5">{profileDetails.email}</span></span>
              <h5 className="text-muted">@{profileDetails.username}</h5>
              <textarea className="form-control lead" cols={500} rows={5} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
              <button type="button" className="btn btn-primary" onClick={bioSubmit}>Submit</button>
            </div>
          </div>
          <div className="mt-2 ms-5 me-5">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className={`nav-link ${active === 'featured' && 'active'}`} aria-current="page" to={`/profile/${profileDetails.username}/featured`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${active === 'pending' && 'active'}`} to={`/profile/${profileDetails.username}/pending`}>Pending Friend Invites</Link>
              </li>
            </ul>
            {renderComponent(active)}
          </div>
        </div>
      : <h1>Loading ...</h1>}
    </>
  );
}

export default UserProfile;
