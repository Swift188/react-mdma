import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Playlist from '../components/Playlist';

const Home = () => {
	// const [modalOpen, setModalOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playlists, setPlaylists] = useState([]);
	const history = useHistory();

	useEffect(async () => {
		// if (localStorage.getItem('playlists') == null) {
		//   let res = await fetch('http://localhost:3001/playlists');
		//   let json = await res.json();
		//   setPlaylists(json);
		// } else {
		//   setPlaylists(JSON.parse(localStorage.getItem('playlists')));
		// }
		await getPlaylists();
	}, []);

	useEffect(() => {
		setSearchResults(playlists);
	}, [playlists]);

	useEffect(() => {
		setSearchResults(
			playlists.filter((playlist) =>
				playlist.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search]);

	const togglePinned = async (id) => {
		let updated = playlists.map((playlist) => {
			if (playlist.id == id)
				return { ...playlist, pinned: !playlist.pinned };
			return playlist;
		});
		updated.sort((a, b) => {
			if (a.pinned > b.pinned) return -1;
			if (b.pinned > a.pinned) return 1;
			return 0;
		});
		setPlaylists(updated);
		// localStorage.setItem('playlists', JSON.stringify(updated));
	};

	async function getPlaylists() {
		let res = await fetch('http://localhost:3001/playlists');
		let json = await res.json();
		setPlaylists(json);
		// localStorage.setItem('playlists', JSON.stringify(json));
	}

	const createPlaylist = async () => {
		const res = await fetch('http://localhost:3001/playlists/', {
			method: 'POST',
			body: JSON.stringify({
				name: 'New playlist',
				icon: '',
				pinned: false,
				creator: 'You',
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		const json = await res.json();
		history.push(`/playlist/${json.id}`);
	};

	return (
		<div className='container'>
			{/* {loggedIn ? <button onClick={logout}>Logout</button> : <button onClick={toggleLogin}>Login</button>} */}

			{/* {loginVisible == true & !loggedIn && <Login setUser={setUser} setLoggedIn={setLoggedIn}/>} */}
			{/* {modalOpen && <AddPlaylistModal />} */}

			<div className='search-bar'>
				<input
					value={search}
					type='text'
					className='search-input'
					placeholder='Search'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<a
					onClick={() => createPlaylist()}
					className='add-playlist-btn'
					href='#'
				>
					<img src='/img/plus-2.png' alt='Create new playlist' />
				</a>
			</div>

			<h1 className='text-center'>Playlists</h1>
			<div className='splitter'></div>

			<div className='playlist-list'>
				{searchResults.map((playlist) => (
					<Playlist
						key={playlist.id}
						playlist={playlist}
						togglePinned={togglePinned}
					/>
				))}
			</div>
		</div>
	);
};

// Home.propTypes = {
// 	playlists: PropTypes.array.isRequired,
// 	togglePinned: PropTypes.func.isRequired,
// };

export default Home;
