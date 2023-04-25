import { useEffect, useState } from 'react';
import YTWatchPartyService from '../api/YTWatchPartyService';
import { IUserPublicProfile } from '../api/YTWatchPartyService';
import { useAuth0 } from '@auth0/auth0-react';

const service = new YTWatchPartyService();

const useFetchFriends = () => {
  const [friends, setFriends] = useState<IUserPublicProfile[] | null>(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchFriends = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const friendsProfiles = await service.getFriends(token);
        return friendsProfiles;
      }
      return null;
    };

    if (friends === null) {
      fetchFriends().then(resp => setFriends(resp)).catch((e) => console.log(e));
    }
  }, [getAccessTokenSilently, friends, isAuthenticated]);

  return friends;
};


export default useFetchFriends;
