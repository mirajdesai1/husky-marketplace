import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import useFetchFriends from '../../hooks/useFetchFriends';
import { useCallback, useState } from 'react';
import YTWatchPartyService from '../../api/YTWatchPartyService';
import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Snackbar, Tooltip } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const service = new YTWatchPartyService();

export default function BasicModal({ videoID }: { videoID: string }) {
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [failureMessageOpen, setFailureMessageOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('');

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  const friends = useFetchFriends();

  const recommendToFriend = useCallback(async () => {
    const token = await getAccessTokenSilently();
    service
      .createRecommendationsPromise(token, selectedFriend, videoID)
      .then((resp) => {
        setSuccessMessageOpen(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
        setFailureMessageOpen(true);
        handleClose();
      });
    handleClose();
  }, [
    selectedFriend,
    getAccessTokenSilently,
    videoID,
    handleClose,
    setSuccessMessageOpen,
  ]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessMessageOpen(false)}
      >
        <Alert
          onClose={() => setSuccessMessageOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {`Video recommended to ${selectedFriend}!`}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={failureMessageOpen}
        autoHideDuration={6000}
        onClose={() => setFailureMessageOpen(false)}
      >
        <Alert
          onClose={() => setFailureMessageOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {`Oops! You've already recommended this video to ${selectedFriend}`}
        </Alert>
      </Snackbar>
      <Tooltip title={!isAuthenticated ? 'Please login to be able to send videos' : ''} >
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpen} disabled={!isAuthenticated}>
        Send
      </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select friend to recommend
          </Typography>
          <br></br>
          {friends != null &&
            friends.map((friend, index) => (
              <div>
                <label>
                  <input
                    type="radio"
                    name="friendsSelect"
                    value={friend.username}
                    style={{ margin: '4px' }}
                    onChange={(e) => setSelectedFriend(e.target.value)}
                  />
                  <img
                    style={{ borderRadius: '50%', marginRight: '4px' }}
                    width={40}
                    height={40}
                    alt="profile"
                    src={friend.picture}
                  ></img>
                  {friend.username}
                </label>
                <br></br>
              </div>
            ))}
          <br></br>
          <button
            type="button"
            className="btn btn-primary mt-1"
            onClick={recommendToFriend}
            disabled={!isAuthenticated}
          >
            Recommend
          </button>
        </Box>
      </Modal>
    </div>
  );
}
