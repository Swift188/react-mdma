import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/styles.css';
import './css/playlists.css';
import playlistsjson from './playlists.json';
// import Login from './Login';
import Home from './Home';
import Playlist from './Playlist';

function App() {
  let [playlists, setPlaylists] = useState([]);
  // let [user, setUser] = useState(null);
  // let [loginVisible, setLoginVisible] = useState(false);
  // let [loggedIn, setLoggedIn] = useState(false);

  // function toggleLogin() {
  //   console.log('TOGGLED', loginVisible);
  //   setLoginVisible(!loginVisible);
  // }

  // function logout() {
  //   setLoggedIn(false);
  //   localStorage.removeItem('user');
  // }

  useEffect(() => {
    if (localStorage.getItem('playlists') == null) {
      setPlaylists(playlistsjson);
    } else {
      setPlaylists(JSON.parse(localStorage.getItem('playlists')));
    }
  }, []);

  function togglePinned(e, id) {
    let updated = playlists.map((playlist) => {
      if (playlist.id == id) return { ...playlist, pinned: !playlist.pinned };
      return playlist;
    });
    // updated.sort()
    updated.sort((a, b) => {
      if (a.pinned > b.pinned) return -1;
      if (b.pinned > a.pinned) return 1;
      return 0;
    });
    setPlaylists(updated);
    localStorage.setItem('playlists', JSON.stringify(updated));
  }

  return (
    <Router>
      <Switch>
        <Route path='/playlist/:playlistId'>
          <Playlist />
        </Route>
        <Route path='/'>
          {/* <Home loggedIn={loggedIn} loginVisible={loginVisible} logout={logout} /> */}
          <Home playlists={playlists} togglePinned={togglePinned} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
