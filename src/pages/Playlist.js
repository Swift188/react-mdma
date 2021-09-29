import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../css/playlist.css';
import Song from '../components/Song';
import Button from '../components/Button';

const Playlist = () => {
	const [songs, setSongs] = useState([]);
	const [playlist, setPlaylist] = useState({});
	const [playlistName, setPlaylistName] = useState('');
	const [inputShow, setInputShow] = useState(false);
	const [playlists, setPlaylists] = useState([]);
	const { id } = useParams();

	useEffect(async () => {
		if (localStorage.getItem('playlists') == null) {
			await getPlaylists();
		} else {
			setPlaylists(JSON.parse(localStorage.getItem('playlists')));
		}

		let res = await fetch(`http://localhost:3001/playlists/${id}/songs`);
		let songs = await res.json();
		setSongs(songs);

		res = await fetch(`http://localhost:3001/playlists/${id}`);
		let playlist = await res.json();
		setPlaylist(playlist);

		setPlaylistName(playlist.name);
		console.log(playlists);
	}, []);

	async function getPlaylists() {
		let res = await fetch('http://localhost:3001/playlists');
		let json = await res.json();
		setPlaylists(json);
		localStorage.setItem('playlists', JSON.stringify(json));
	}

	async function savePlaylistName(key) {
		if (key === 'Enter') {
			let updated = { ...playlist, name: playlistName };
			setPlaylist(updated);
			setInputShow(false);
			await fetch(`http://localhost:3001/playlists/${playlist.id}`, {
				method: 'PUT',
				body: JSON.stringify(updated),
				headers: { 'Content-Type': 'application/json' },
			});
			await getPlaylists();
		}
		if (key === 'Escape') {
			setInputShow(false);
		}
	}

	return (
		<div className='container'>
			<div>
				<Button href='/'>{'<'} Go back</Button>
			</div>
			<br />
			<div className='playlist-info'>
				<img className='playlist-img' src={playlist.icon} />
				<div className='playlist-details'>
					<div className='playlist-name'>
						{inputShow ? (
							<input
								type='text'
								value={playlistName}
								onKeyUp={(e) => savePlaylistName(e.key)}
								onChange={(e) =>
									setPlaylistName(e.target.value)
								}
								autoFocus={true}
							/>
						) : (
							<div>
								<div onClick={() => setInputShow(true)}>
									{playlist.name}
								</div>
							</div>
						)}
					</div>
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
				{/* <a className='add-song-btn' href='#'>
					<img src='/img/plus-2.png' />
				</a> */}
			</div>

			<div className='songs-list'>
				{songs.map((song) => (
					<Song key={song.id} song={song} />
				))}
			</div>
		</div>
	);
};

export default Playlist;
