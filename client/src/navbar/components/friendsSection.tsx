import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchFriends from '../../hooks/useFetchFriends';

const FriendSection = () => {
  const friends = useFetchFriends();

  return (
    <List>
      <Typography variant="h6" textAlign={'left'} marginLeft={2}>
        Friends
      </Typography>
      {friends != null &&
        friends.map((friend, index) => (
          <Link to={`/profile/${friend.username}`}>
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
                <ListItemText primary={friend.username} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
    </List>
  );
};

export default FriendSection;
