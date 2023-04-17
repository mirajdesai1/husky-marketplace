import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const getPlaylists = async (token: string) => {
  const prof = await axios.get(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${process.env.REACT_APP_MIRAJ_USER_ID}`,
    { headers: { "Authorization": `Bearer ${process.env.REACT_APP_AUTH0_MANAGEMENT_TOKEN}` } }
  )

  console.log(prof)

  const googleAuth = prof.data.identities[0].access_token;

  // const response = await axios.get(
  //   `https://www.googleapis.com/youtube/v3/playlists?key=${YOUTUBE_KEY}&part=snippet&mine=true`,
  //   { headers: { "Authorization": `Bearer ${googleAuth}` } }
  // );
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/subscriptions?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&mine=true`,
    { headers: { "Authorization": `Bearer ${googleAuth}` } },
  )
  // const response = await axios.get(
  //   `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_KEY}&part=snippet&q=music`,
  //   { headers: { "Authorization": `Bearer ${token}` } }
  // );
  const json = await response.data;
  console.log(json)
  return json;
};

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube Watch Party
        </a>
        <Login />
        <button onClick={async () => {
          const token = await getAccessTokenSilently();
          console.log(token);
          getPlaylists(token);
        }}>get playlists</button>
      </header>
    </div>
  );
}

export default App;
