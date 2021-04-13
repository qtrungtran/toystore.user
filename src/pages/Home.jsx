import React from 'react';
import Banner from 'components/banner';
import Product from 'components/product/index';
import CategoryList from 'components/modules/CategoryList';
import ProductList from 'components/modules/ProductList';

const Home = () => {
	return (
		<div className='page page_home'>
			{/* <Banner /> */}
			<CategoryList />
			<ProductList />
		</div>
	);
};

export default Home;
