import React from 'react'
import Playlist from './components/Playlist';
import PropTypes from 'prop-types';

const Home = ({ playlists, togglePinned }) => {
    return (
        <div className="container">
        {/* {loggedIn ? <button onClick={logout}>Logout</button> : <button onClick={toggleLogin}>Login</button>} */}
          
          {/* {loginVisible == true & !loggedIn && <Login setUser={setUser} setLoggedIn={setLoggedIn}/>} */}
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
              <Playlist key={playlist.id} playlist={playlist} togglePinned={togglePinned} />
            ))}
          </div>
      </div>
    )
}

Home.propTypes = {
    playlists: PropTypes.array.isRequired,
    togglePinned: PropTypes.func.isRequired
};

export default Home
