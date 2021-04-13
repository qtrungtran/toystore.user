import React, { useState, useEffect } from 'react';
import Category from 'components/category';
import categoryAPI from 'api/category';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await categoryAPI.getAll();
			setCategories(response.data.categories);
		} catch (error) {
			console.log('Failed to fetch categories: ', error);
		}
	};

	return (
		<div className='categories-shop'>
			<div className='container'>
				<div className='row'>
					<div className='title-all text-center w-100'>
						<h1>DANH MỤC</h1>
					</div>
				</div>
				<div className='row'>
					{categories.map((category, index) => (
						<div className='col-lg-2 col-md-2 col-sm-3 col-xs-3' key={index}>
							<Category category={category} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryList;
