import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/styles.css';
import './css/playlists.css';
// import playlistsjson from './playlists.json';
// import Login from './Login';
import Home from './pages/Home';
import Playlist from './pages/Playlist';

function App() {
	// let [user, setUser] = useState(null);
	// let [loginVisible, setLoginVisible] = useState(false);
	// let [loggedIn, setLoggedIn] = useState(false);

	// function toggleLogin() {
	//   console.log('TOGGLED', loginVisible);
	//   setLoginVisible(!loginVisible);
	// }

	// function logout() {
	//   setLoggedIn(false);
	//   localStorage.removeItem('user');
	// }

	return (
		<Router>
			<Switch>
				<Route path='/playlist/:playlistId'>
					<Playlist />
				</Route>
				<Route path='/'>
					{/* <Home loggedIn={loggedIn} loginVisible={loginVisible} logout={logout} /> */}
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
