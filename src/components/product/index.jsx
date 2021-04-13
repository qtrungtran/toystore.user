import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import cartDetailAPI from "api/cartDetail";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { addCartDetail } from "features/cartSlice";

const error = (title, content, ok, onOk) => {
	Modal.error({
		title: title,
		content: content,
		okText: ok,
		onOk: onOk
	});
};

const Product = ({
	id,
	name,
	price,
	image,
	quantity,
	cartId,
	isAuthenticated,
	fetchCart
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { showError, showSuccess } = useNotification();
	const { cart } = useSelector(state => state.cart);
	const cartDetails = cart.cartDetails;

	return (
		<div className="products-single fix">
			<div className="box-img-hover">
				<img src={image} className="img-fluid" alt="" />
				<div className="mask-icon">
					<ul>
						<li>
							<a
								onClick={e => {
									e.preventDefault();
									history.push({
										pathname: "/product-detail",
										search: `?id=${id}`
									});
								}}
								href="/product-detail"
								data-toggle="tooltip"
								data-placement="right"
								title="Xem ngay"
							>
								<i className="fas fa-eye"></i>
							</a>
						</li>
					</ul>
					<button
						className="cart"
						onClick={() => {
							if (!isAuthenticated) {
								showError("Vui lòng đăng nhập để tiếp tục");
								return;
							}
							const index = cartDetails.findIndex(
								detail => detail.productId === id && detail.cartId === cartId
							);
							let allowQuantity;
							if (index !== -1) {
								allowQuantity = quantity - cartDetails[index].quantity;
								console.log("allowQuantity", allowQuantity);
								if (allowQuantity < 1) {
									error(
										"Lỗi",
										"Bạn không thể thêm sản phẩm",
										"Đồng ý",
										() => {}
									);
									return;
								}
							}
							dispatch(
								addCartDetail({
									productId: id,
									cartId,
									quantity: 1,
									price
								})
							);
							showSuccess("Đã thêm vào giỏ hàng");
							// try {
							// 	const quantity = 1;
							// 	const response = await cartDetailAPI.add({
							// 		productId: id,
							// 		cartId,
							// 		quantity,
							// 		price
							// 	});
							// 	await fetchCart();
							// 	showSuccess("Đã thêm vào giỏ hàng");
							// } catch (error) {
							// 	showError("Không thể thêm vào giỏ hàng");
							// }
						}}
					>
						Thêm vào giỏ hàng
					</button>
				</div>
			</div>
			<div className="why-text">
				<h4>{name}</h4>
				<h5>${price}</h5>
			</div>
		</div>
	);
};

export default Product;
