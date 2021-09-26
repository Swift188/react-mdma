import React from 'react'

const Playlist = ({ playlist }) => {
    return (
        <div className="playlist">
            <img className="playlist-img" src="img/images.jpeg" alt={playlist.name} />
            <div className="playlist-details">
                <a className="playlist-name">{playlist.name}</a>
                {/* <div className="playlist-author">Group name</div> */}
            </div>
            <div className="playlist-buttons">
                <a href="#" className="icon-btn">
                    <img src="img/push-pin.png" alt="Pin" />
                </a>
                <a href="#" className="icon-btn">
                    <img src="img/vertical-dots.png" alt="Options" />
                </a>
            </div>
        </div>
    )
}

export default Playlist
