import React, {useState} from 'react';
import './css/styles.css';
import './css/playlists.css';
// import playlists from './playlists.json';
import Playlist from './components/Playlist';
import Login from './components/Login';

const playlists = [
    {
        "id": 1,
        "name": "Leuke playlist",
        "icon": "img/images.jpeg"
    },
    {
        "id": 2,
        "name": "Coole playlist",
        "icon": "img/images.jpeg"
    },
    {
        "id": 3,
        "name": "toffe playlist",
        "icon": "img/images.jpeg"
    }
];

function App() {
  let [user, setUser] = useState(null);
  let [loginVisible, setLoginVisible] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);

  function toggleLogin() {
    console.log('TOGGLED', loginVisible);
    setLoginVisible(!loginVisible);
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('user');
  }

  return (
    <div className="container">
      {loggedIn ? <button onClick={logout}>Logout</button> : <button onClick={toggleLogin}>Login</button>}
        
        {loginVisible == true & !loggedIn && <Login setUser={setUser} setLoggedIn={setLoggedIn}/>}
        <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search" />
            <a className="add-playlist-btn" href="#">
                <img src="img/plus-2.png" alt="Add song" />
            </a>
        </div>

        <h1 className="text-center">Playlists</h1>
        <div className="splitter"></div>
        
        <div className="playlist-list">
          {playlists.map((playlist) => (
            <Playlist key={playlist.id} playlist={playlist}/>
          ))}
        </div>
    </div>
  );
}

export default App;
