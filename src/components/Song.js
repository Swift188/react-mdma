import React from 'react';
import PropTypes from 'prop-types';

const Song = ({ song }) => {
	return (
		<div key={song.id} className='song'>
			<img className='song-img' src='/img/images.jpeg' />
			<div className='song-details'>
				<div className='song-name'>{song.name}</div>
				<div className='song-author'>{song.artist}</div>
			</div>
			<div className='song-buttons'>
				<a href='#' className='star-btn'>
					<img src='/img/star-3.png' />
				</a>
			</div>
		</div>
	);
};

Song.propTypes = {
	song: PropTypes.object.isRequired,
};

export default Song;
