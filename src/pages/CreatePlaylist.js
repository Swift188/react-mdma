import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import '../css/playlist.css';
import Song from '../components/Song';
import LinkButton from '../components/LinkButton';

const Playlist = () => {
	const [playlist, setPlaylist] = useState({
		name: 'New playlist',
		icon: '',
		pinned: false,
		creator: 'You',
	});
	const [songs, setSongs] = useState([]);
	const [playlistName, setPlaylistName] = useState('New playlist');
	// const [togglePlaylistNameInput, setTogglePlaylistNameInput] =
	// 	useState(false);
	const [inputShow, setInputShow] = useState(true);
	const [playlists, setPlaylists] = useState([]);

	useEffect(async () => {
		if (localStorage.getItem('playlists') == null) {
			await getPlaylists();
		} else {
			setPlaylists(JSON.parse(localStorage.getItem('playlists')));
		}
		setSongs([]);

		let res = await fetch('http://localhost:3001/playlists/', {
			method: 'POST',
			body: JSON.stringify(playlist),
			headers: { 'Content-Type': 'application/json' },
		});
		let json = await res.json();
		localStorage.setItem('playlists', JSON.stringify(playlists));
		console.log(json);
		setPlaylist({ ...playlist, id: json.id });
		await getPlaylists();
	}, []);

	async function getPlaylists() {
		let res = await fetch('http://localhost:3001/playlists');
		let json = await res.json();
		setPlaylists(json);
		localStorage.setItem('playlists', JSON.stringify(json));
	}

	async function savePlaylistName(key) {
		switch (key) {
			case 'Enter':
				setPlaylist({ ...playlist, name: playlistName });
				setInputShow(false);
				await fetch(`http://localhost:3001/playlists/${playlist.id}`, {
					method: 'PUT',
					body: JSON.stringify(playlist),
					headers: { 'Content-Type': 'application/json' },
				});
				await getPlaylists();
				break;
			case 'Escape':
				setInputShow(false);
				break;
		}
	}

	return (
		<div className='container'>
			<div>
				<LinkButton href='/'>{'<'} TERUG Go back</LinkButton>
			</div>
			<br />
			<div className='playlist-info'>
				<img className='playlist-img' src='/img/Compilation.jpg' />
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
								<h1>AAAA</h1>
								<div onClick={setInputShow(true)}>
									{playlist.name}
								</div>
							</div>
						)}
					</div>
					<span className='playlist-creator'>By: You</span>
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
					<Song key={song.id} song={song} />
				))}
			</div>
		</div>
	);
};

export default Playlist;
