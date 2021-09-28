import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Playlist = ({ playlist, togglePinned }) => {
	return (
		<div className='playlist'>
			<img
				className='playlist-img'
				src={playlist.icon}
				alt={playlist.name}
			/>
			<Link to={`/playlists/${playlist.id}`} className='playlist-details'>
				<div className='playlist-name'>{playlist.name}</div>
				{/* <div className="playlist-author">Group name</div> */}
			</Link>
			<div className='playlist-buttons'>
				<a
					href='#'
					onClick={(e) => togglePinned(e, playlist.id)}
					className='icon-btn'
				>
					<img
						src={
							playlist.pinned
								? 'img/push-pin.png'
								: 'img/push-pin-empty.png'
						}
						alt='Pin'
					/>
				</a>
				{/* <a href="#" className="icon-btn">
                    <img src="img/vertical-dots.png" alt="Options" />
                </a> */}
			</div>
		</div>
	);
};

Playlist.propTypes = {
	playlist: PropTypes.object.isRequired,
	togglePinned: PropTypes.func.isRequired,
};

export default Playlist;
