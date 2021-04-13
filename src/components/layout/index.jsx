import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SearchProvider } from 'app/context/SearchContext';

const Layout = ({ Content, ...props }) => {
	return (
		<SearchProvider>
			<div className='app_layout'>
				<Header />
				<Content {...props} />
				<Footer />
			</div>
		</SearchProvider>
	);
};

Layout.propTypes = {};
export default Layout;
