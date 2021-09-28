import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Playlist from '../pages/Playlist';
import CreatePlaylist from '../pages/CreatePlaylist';

const index = () => {
	let { path } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${path}/create`}>
				<CreatePlaylist />
			</Route>
			<Route path={`${path}/:id`}>
				<Playlist />
			</Route>
		</Switch>
	);
};

export default index;
