import React from 'react';
import About from 'pages/About';
import withLayout from 'components/hocs/withLayout';
import Logout from 'pages/Logout';

const routes = {
	home: {
		path: '/',
		component: withLayout(React.lazy(() => import('pages/Home'))),
		exact: true
	},
	about: {
		path: '/about',
		component: About,
		exact: true
	},
	login: {
		path: '/login',
		component: withLayout(React.lazy(() => import('pages/Login'))),
		exact: true
	},
	register: {
		path: '/register',
		component: withLayout(React.lazy(() => import('pages/Register'))),
		exact: true
	},
	logout: {
		path: '/logout',
		component: Logout,
		exact: true
	},
	profile: {
		path: '/profile',
		component: withLayout(
			React.lazy(() => import('pages/accountInfo/Profile'))
		),
		exact: true
	},
	'my-product': {
		path: '/my-product',
		component: withLayout(
			React.lazy(() => import('pages/accountInfo/MyProduct'))
		),
		exact: true
	},
	'my-order': {
		path: '/my-order',
		component: withLayout(
			React.lazy(() => import('pages/accountInfo/MyOrder'))
		),
		exact: true
	},
	order: {
		path: '/order',
		component: withLayout(React.lazy(() => import('pages/accountInfo/Order'))),
		exact: true
	},
	'product-detail': {
		path: '/product-detail',
		component: withLayout(React.lazy(() => import('pages/ProductDetail'))),
		exact: true
	},
	cart: {
		path: '/cart',
		component: withLayout(React.lazy(() => import('pages/Cart'))),
		exact: true
	},
	checkout: {
		path: '/checkout',
		component: withLayout(React.lazy(() => import('pages/Checkout'))),
		exact: true
	},
	'category-detail': {
		path: '/category-detail',
		component: withLayout(React.lazy(() => import('pages/CategoryDetail'))),
		exact: true
	},
	paypal: {
		path: '/paypal',
		component: withLayout(React.lazy(() => import('pages/Paypal'))),
		exact: true
	}
};

export default routes;
