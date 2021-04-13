import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';

const AppRouter = () => {
	return (
		<Router>
			{Object.entries(routes).map(([routeKey, routeConfig]) => {
				return <Route key={routeKey} {...routeConfig} />;
			})}
		</Router>
	);
};

export default AppRouter;
