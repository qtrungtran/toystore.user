import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TitleBox from 'components/titleBox';
import MyProduct from 'components/myProduct';
import AddProduct from 'components/myProduct/addProduct';
import EditProduct from 'components/myProduct/editProduct';
import { localAuthenticate } from 'utils/localAuth';
import useNotification from 'utils/hooks/notification';
import clsx from 'clsx';
import productAPI from 'api/product';
import CPagination from 'components/cPagination';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fff',
		minHeight: '100%',
		paddingBottom: theme.spacing(9),
		paddingTop: theme.spacing(9)
	}
}));

const MyProductContent = () => {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const { showSuccess, showError } = useNotification();
	const [activePage, setActivePage] = useState(1);
	const [showEditProduct, setShowEditProduct] = useState({
		isShow: false,
		productId: null
	});
	const [pagination, setPagination] = useState({
		activePage: 1,
		itemsCountPerPage: 0,
		totalItemsCount: 0
	});

	const handlePageChange = pageNumber => {
		console.log(`active page is ${pageNumber}`);
		setPagination({
			...pagination,
			activePage: pageNumber
		});
	};

	const fetchProduct = async () => {
		try {
			const params = {
				page: pagination.activePage,
				limit: 3
			};
			const response = await productAPI.getByUser({ params: params });
			setProducts(response.data.dataInPage);
			setPagination({
				...pagination,
				itemsCountPerPage: params.limit,
				totalItemsCount: response.data.total
			});
			console.log('product', products);
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	const fetchOneProduct = async id => {
		try {
			const response = await productAPI.get(id);
			setProducts(response.data.product);
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [pagination.activePage]);

	const handleDeleteProduct = async id => {
		try {
			const response = await productAPI.delete(id);
			const newProducts = products.filter(
				product => product.id !== response.data.id
			);
			setProducts(newProducts);
			showSuccess('Deleted successfully.');
		} catch (error) {
			showError('Failed to delete');
		}
	};

	const toggleEditProduct = id => {
		setShowEditProduct({
			isShow: true,
			productId: id
		});
	};

	return (
		<>
			<TitleBox parent='Trang chủ' children='Sản phẩm của tôi' path='/' />
			<div className={clsx('container', classes.root)}>
				<div className='row special-list'>
					<div className='col-lg-6 col-md-12'>
						{products.length > 0
							? products.map((product, index) => (
									<MyProduct
										key={index}
										product={{ ...product }}
										handleDeleteProduct={handleDeleteProduct}
										toggleEditProduct={() => toggleEditProduct(product.id)}
									/>
							  ))
							: 'Chưa có sản phẩm nào'}
						{products.length > 0 && (
							<CPagination
								{...pagination}
								handlePageChange={handlePageChange}
							/>
						)}
					</div>
					<div className='col-lg-6 col-md-12'>
						{showEditProduct.isShow ? (
							<EditProduct
								fetchProduct={fetchProduct}
								product={
									products.filter(p => p.id === showEditProduct.productId)[0]
								}
							/>
						) : (
							<AddProduct fetchProduct={fetchProduct} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyProductContent;
