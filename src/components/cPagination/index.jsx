import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './cPagination.scss';
// require('bootstrap/less/bootstrap.less');

const CPagination = ({
	activePage,
	itemsCountPerPage,
	totalItemsCount,
	handlePageChange
}) => {
	return (
		<div>
			<Pagination
				activePage={activePage}
				itemsCountPerPage={itemsCountPerPage}
				totalItemsCount={totalItemsCount}
				pageRangeDisplayed={5}
				onChange={handlePageChange}
			/>
		</div>
	);
};

export default CPagination;
