import React from 'react';
import { useHistory } from 'react-router-dom';

const Category = ({ category }) => {
	const history = useHistory();
	return (
		<div
			className='shop-cat-box category'
			onClick={() => {
				history.push({
					pathname: '/category-detail',
					search: `?id=${category.id}`
				});
			}}
		>
			{/* <img className='img-fluid' src='images/t-shirts-img.jpg' alt='' /> */}
			<span className='btn hvr-hover' style={{ whiteSpace: 'break-spaces' }}>
				{category.name}
			</span>
		</div>
	);
};

export default Category;
