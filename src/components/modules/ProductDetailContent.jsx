import TitleBox from "components/titleBox";
import ProductDetail from "components/productDetail";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import productAPI from "api/product";
import reviewAPI from "api/review";
import { useDispatch, useSelector } from "react-redux";
import { getByUser } from "features/cartSlice";
import { localAuthenticate } from "utils/localAuth";

const ProductDetailContent = () => {
	const { search } = useLocation();
	const { id } = qs.parse(search.replace(/^\?/, ""));
	const [product, setProduct] = useState({
		id: "",
		name: "",
		price: 0,
		description: "",
		images: [],
		user: {},
		category: "",
		avaQuantity: 0,
		sold: 0
	});
	const [reviews, setReviews] = useState([]);
	const { isAuthenticated } = localAuthenticate();
	// const [cartId, setCartId] = useState('');
	const { cart } = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const fetchProduct = async id => {
		try {
			// const params = {
			//   _page: 1,
			//   _limit: 10,
			// };
			const response = await productAPI.get(id);
			const fetchedProduct = response.data.product;
			setProduct({
				id: fetchedProduct.id,
				name: fetchedProduct.name,
				price: fetchedProduct.price,
				description: fetchedProduct.description,
				images: fetchedProduct.images.filter(image => !image.isDeleted),
				user: fetchedProduct.user,
				category: fetchedProduct.category.name,
				avaQuantity: fetchedProduct.quantity,
				sold: fetchedProduct.sold
			});
		} catch (error) {
			console.log("Failed to fetch product: ", error);
		}
	};
	const fetchCart = () => {
		dispatch(
			getByUser()
			// 	{
			// 	onComplete: (error, data) => {
			// 		if (!error) {
			// 			setCartId(data.cart.id);
			// 			return;
			// 		}
			// 		setCartId('');
			// 	}
			// }
		);
		// try {
		// 	const response = await cartAPI.getByUser();
		// 	const fetchedCart = response.data.cart;
		// 	setCartId(fetchedCart.id);
		// } catch (error) {
		// 	console.log('Failed to fetch cart: ', error);
		// }
	};

	const fetchReview = async productId => {
		try {
			// const params = {
			//   _page: 1,
			//   _limit: 10,
			// };
			const response = await reviewAPI.getByProduct(productId);
			setReviews(response.data.reviews);
		} catch (error) {
			console.log("Failed to fetch reviews: ", error);
		}
	};

	useEffect(() => {
		fetchProduct(id);
	}, [id]);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getByUser());
		}
	}, [isAuthenticated, dispatch]);

	useEffect(() => {
		fetchReview(id);
	}, [id]);

	return (
		<div>
			<TitleBox parent="Trang chủ" children="Chi tiết sản phẩm" path="/" />
			<ProductDetail
				{...product}
				cartId={cart.id}
				isAuthenticated={isAuthenticated}
				fetchCart={fetchCart}
				reviews={reviews}
			/>
		</div>
	);
};

export default ProductDetailContent;
