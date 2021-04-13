import TitleBox from "components/titleBox";
import Checkout from "components/checkout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getByUser } from "features/cartSlice";
import transportationAPI from "api/transportation";
import _ from "lodash";

const CheckoutContent = () => {
	const { cart } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const fetchCart = () => {
		dispatch(getByUser());
	};

	const [trans, setTrans] = useState([]);

	useEffect(() => {
		async function fetchTrans() {
			try {
				const res = await transportationAPI.getAll();
				setTrans(res.data.trans);
			} catch (error) {
				console.log("Failed to fetch trans: ", error);
			}
		}
		fetchTrans();
	}, []);

	// new
	const location = useLocation();
	const products = location.state.data;
	const users = [];
	for (let p of products) {
		console.log("hiiii: ", p.product.user.username);
		if (_.indexOf(users, p.product.user.username) === -1) {
			users.push(p.product.user.username);
		}
		console.log("ss: ", users);
	}
	const productsByOwner = users.map(user => {
		const data = [];
		for (let p of products) {
			if (user === p.product.user.username) {
				data.push(p);
			}
		}
		return {
			user,
			data
		};
	});

	console.log("productsByOwner", productsByOwner);

	return (
		<div>
			<TitleBox parent="Trang chủ" children="Đặt hàng" path="/" />
			{/* {productsByOwner.map((detailObj, index) => ( */}
			<Checkout
				// key={index}
				cartDetails={products}
				trans={trans}
				// owner={detailObj.user}
				productsByOwner={productsByOwner}
			/>
			{/* ))} */}
		</div>
	);
};

export default CheckoutContent;
