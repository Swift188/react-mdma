import React, { useEffect, useState } from 'react';
import AddPlaylistModal from '../components/AddPlaylistModal';
import Playlist from '../components/Playlist';
// import PropTypes from 'prop-types';

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	let [playlists, setPlaylists] = useState([]);

	useEffect(async () => {
		if (localStorage.getItem('playlists') == null) {
			let res = await fetch('http://localhost:3001/playlists');
			let json = await res.json();
			setPlaylists(json);
		} else {
			setPlaylists(JSON.parse(localStorage.getItem('playlists')));
		}
	}, []);

	function togglePinned(e, id) {
		let updated = playlists.map((playlist) => {
			if (playlist.id == id)
				return { ...playlist, pinned: !playlist.pinned };
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

	useEffect(() => {
		setSearchResults(playlists);
	}, [playlists]);

	useEffect(() => {
		setSearchResults(
			// playlists.filter((playlist) => {
			// 	if (playlist['name'].includes(search)) {
			// 		console.log(playlist, playlist['name'].includes(search));
			// 		return { ...playlist };
			// 	}
			// })
			playlists.filter((playlist) =>
				playlist.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search]);

	return (
		<div className='container'>
			{/* {loggedIn ? <button onClick={logout}>Logout</button> : <button onClick={toggleLogin}>Login</button>} */}

			{/* {loginVisible == true & !loggedIn && <Login setUser={setUser} setLoggedIn={setLoggedIn}/>} */}
			{modalOpen && <AddPlaylistModal />}

			<div className='search-bar'>
				<input
					value={search}
					type='text'
					className='search-input'
					placeholder='Search'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<a
					onClick={(e) => setModalOpen(!modalOpen, e)}
					className='add-playlist-btn'
					href='#'
				>
					<img src='/img/plus-2.png' alt='Add song' />
				</a>
			</div>

			<h1 className='text-center'>Playlists</h1>
			<div className='splitter'></div>

			<div className='playlist-list'>
				{searchResults.map((playlist) => {
					try {
						return (
							<Playlist
								key={playlist.id}
								playlist={playlist}
								togglePinned={togglePinned}
							/>
						);
					} catch (e) {
						console.error(e);
						console.log(searchResults);
					}
				})}
			</div>
		</div>
	);
};

// Home.propTypes = {
// 	playlists: PropTypes.array.isRequired,
// 	togglePinned: PropTypes.func.isRequired,
// };

export default Home;
