import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchFriends from '../../hooks/useFetchFriends';

const FriendSection = () => {
  const friends = useFetchFriends();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <List>
      <Typography variant="h6" textAlign={'left'} marginLeft={2}>
        Friends
      </Typography>
      {friends != null &&
        friends.map((friend, index) => (
          <Link className='text-decoration-none' to={`/profile/${friend.username}`}>
            <ListItem key={friend.username} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    style={{ borderRadius: '50%' }}
                    width={50}
                    height={50}
                    src={friend.picture}
                    alt="profile"
                  ></img>
                </ListItemIcon>
                {matches &&
                <ListItemText primary={friend.username} />}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
    </List>
  );
};

export default FriendSection;
