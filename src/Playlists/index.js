import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Playlist from '../pages/Playlist';

const index = () => {
	let { path } = useRouteMatch();

	return (
		<Switch>
			<Route path={`${path}/:id`}>
				<Playlist />
			</Route>
		</Switch>
	);
};

export default index;
