import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/playlist.css';

const Playlist = () => {
	let [songs, setSongs] = useState([]);
	let [playlist, setPlaylist] = useState([]);
	let { playlistId } = useParams();

	useEffect(async () => {
		let res = await fetch(
			`http://localhost:3001/playlists/${playlistId}/songs`
		);
		let songs = await res.json();
		setSongs(songs);

		res = await fetch(`http://localhost:3001/playlists/${playlistId}`);
		let playlist = await res.json();
		setPlaylist(playlist);
	}, []);

	return (
		<div className='container'>
			<Link to='/'>{'<-'} Go back</Link>
			<br />
			<div className='playlist-info'>
				<img className='playlist-img' src='/img/Compilation.jpg' />
				<div className='playlist-details'>
					<div className='playlist-name'>{playlist.name}</div>
					<span className='playlist-creator'>
						By: {playlist.creator}
					</span>
				</div>
			</div>

			<div className='splitter'></div>

			<div className='search-bar'>
				<input
					type='text'
					className='search-input'
					placeholder='Search'
				/>
				<a className='add-song-btn' href='#'>
					<img src='/img/plus-2.png' />
				</a>
			</div>

			<div className='songs-list'>
				{songs.map((song) => (
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
				))}
			</div>
		</div>
	);
};

export default Playlist;
