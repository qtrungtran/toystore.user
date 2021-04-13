import TitleBox from "components/titleBox";
import Cart from "components/cart";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByUser, deleteCartDetail } from "features/cartSlice";

const CartContent = () => {
	const { cart } = useSelector(state => state.cart);
	// const [cart, setCart] = useState({
	// 	user: { username: '' },
	// 	cartDetails: []
	// });
	const dispatch = useDispatch();

	const fetchCart = () => {
		dispatch(getByUser());
		// try {
		// 	const response = await cartAPI.getByUser();
		// 	const fetchedCart = response.data.cart;
		// 	setCart({
		// 		username: fetchedCart.user.username,
		// 		cartDetails: fetchedCart.cartDetails
		// 	});
		// } catch (error) {
		// 	console.log('Failed to fetch cart: ', error);
		// }
	};

	useEffect(() => {
		dispatch(getByUser());
	}, [dispatch]);

	const deleteCart = (productId, cartId) => {
		dispatch(deleteCartDetail(productId, cartId));
	};

	return (
		<div>
			<TitleBox parent="Trang chủ" children="Giỏ hàng" path="/" />
			<Cart
				cartDetails={cart.cartDetails}
				fetchCart={fetchCart}
				deleteCartDetail={deleteCart}
			/>
		</div>
	);
};

export default CartContent;
