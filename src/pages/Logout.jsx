import routes from 'app/routing/routes';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { actions as authActions } from 'features/auth/authSlice';

const Logout = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	React.useEffect(() => {
		dispatch(authActions.logout());
		history.push(routes.home.path);
	});
	return null;
};

export default Logout;
