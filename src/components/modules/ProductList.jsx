import React, { useState, useEffect } from "react";
import Product from "components/product";
import productAPI from "api/product";
import { useDispatch, useSelector } from "react-redux";
import { getByUser } from "features/cartSlice";
import { localAuthenticate } from "utils/localAuth";
import useNotification from "utils/hooks/notification";
import CPagination from "components/cPagination";
import { useSearch } from "app/context/SearchContext";

const ProductList = () => {
	const { isAuthenticated } = localAuthenticate();
	const [products, setProducts] = useState([]);
	const [latestProducts, setLatestProducts] = useState([]);
	const [bestSellerProducts, setBestSellerProducts] = useState([]);
	// const [cartId, setCartId] = useState('');
	const { cart } = useSelector((state) => state.cart);
	const cartId = cart.id;
	const [typeValue, setTypeValue] = useState(1);
	const { search } = useSearch();
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();
	const [pagination, setPagination] = useState({
		activePage: 1,
		itemsCountPerPage: 0,
		totalItemsCount: 0,
	});

	const handlePageChange = (pageNumber) => {
		console.log(`active page is ${pageNumber}`);
		setPagination({
			...pagination,
			activePage: pageNumber,
		});
	};

	useEffect(() => {
		fetchProductsByType();

		// fetchLatestProducts();
		// fetchBestSellerProducts();
	}, [pagination.activePage, typeValue, search]);

	const fetchProductsByType = async () => {
		try {
			const params = {
				page: pagination.activePage,
				limit: 12,
				type: typeValue,
				search: search,
			};
			const response = await productAPI.getByType({ params: params });
			const products = await response.data.dataInPage;

			// const filteredProducts = products.filter(
			// 	product => product.price >= value[0] && product.price <= value[1]
			// );
			setProducts(products);
			setPagination({
				...pagination,
				itemsCountPerPage: params.limit,
				totalItemsCount: response.data.total,
			});
		} catch (error) {
			console.log("Failed to fetch products: ", error);
		}
	};

	const fetchLatestProducts = async () => {
		try {
			const response = await productAPI.getByType(2);
			setLatestProducts(response.data.products);
		} catch (error) {
			console.log("Failed to fetch products: ", error);
		}
	};

	const fetchBestSellerProducts = async () => {
		try {
			const response = await productAPI.getByType(3);
			setBestSellerProducts(response.data.products);
		} catch (error) {
			console.log("Failed to fetch products: ", error);
		}
	};

	// const fetchProducts = async () => {
	// 	try {
	// 		// const params = {
	// 		//   _page: 1,
	// 		//   _limit: 10,
	// 		// };
	// 		const response = await productAPI.getByType(1);
	// 		setProducts(response.data.products);
	// 	} catch (error) {
	// 		console.log('Failed to fetch products: ', error);
	// 	}
	// };

	const fetchCart = () => {
		dispatch(getByUser());
	};

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		fetchCart();
	// 	}
	// }, [dispatch, isAuthenticated]);

	return (
		<div className="products-box">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-all text-center">
							<h1>SẢN PHẨM</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="special-menu text-center">
							<div className="button-group filter-button-group">
								<button
									className="active"
									// data-filter='.all'
									onClick={() => setTypeValue(1)}
								>
									Tất cả
								</button>
								<button
									// data-filter='.top-featured'
									onClick={() => setTypeValue(2)}
								>
									Mới nhất
								</button>
								<button
									// data-filter='.best-seller'
									onClick={() => setTypeValue(3)}
								>
									Bán chạy
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row special-list">
					{products.map((product, index) => (
						<div className="col-lg-3 col-md-6 special-grid all" key={index}>
							<Product
								id={product.id}
								name={product.name}
								price={product.price}
								image={product.images.filter((i) => !i.isDeleted)[0]?.path}
								quantity={product.quantity}
								cartId={cartId}
								isAuthenticated={isAuthenticated}
								fetchCart={fetchCart}
							/>
						</div>
					))}
					{/* {latestProducts.map((product, index) => (
						<div
							className='col-lg-3 col-md-6 special-grid top-featured'
							key={index}
						>
							<Product
								id={product.id}
								name={product.name}
								price={product.price}
								image={
									product.images.length > 0
										? product.images[0].path
										: 'https://picsum.photos/400'
								}
								cartId={cartId}
								isAuthenticated={isAuthenticated}
								fetchCart={fetchCart}
							/>
						</div>
					))}
					{bestSellerProducts.map((product, index) => (
						<div
							className='col-lg-3 col-md-6 special-grid best-seller'
							key={index}
						>
							<Product
								id={product.id}
								name={product.name}
								price={product.price}
								image={
									product.images.length > 0
										? product.images[0].path
										: 'https://picsum.photos/400'
								}
								cartId={cartId}
								isAuthenticated={isAuthenticated}
								fetchCart={fetchCart}
							/>
						</div>
					))} */}
				</div>
				{products.length > 0 && (
					<div className="row">
						<div className="col-12">
							<CPagination {...pagination} handlePageChange={handlePageChange} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductList;
