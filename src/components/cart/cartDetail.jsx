import React, { useState, Component } from "react";
import { useHistory } from "react-router-dom";
import calTotal from "utils/calTotal";
import useNotification from "utils/hooks/notification";
import { useDispatch } from "react-redux";
import _ from "lodash";
import "antd/dist/antd.css";
import { Checkbox, Modal, version } from "antd";
import { deleteCartDetail, editCartDetail } from "features/cartSlice";

const error = (title, content, ok, onOk) => {
	Modal.error({
		title: title,
		content: content,
		okText: ok,
		onOk: onOk
	});
};

const CartDetail = ({ detailObj }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { showSuccess } = useNotification();

	const [options, setOptions] = useState({
		checked: {},
		checkAll: false
	});
	const onCheckAllChange = (e, groupKey) => {
		if (e.target.checked) {
			const checked = groupKey.reduce((prev, curr) => {
				return { ...prev, [curr.productId]: true };
			}, {});
			setOptions({ checked, checkAll: true });
		}
	};
	const onChange = (e, value, groupKey) => {
		setOptions(state => ({
			checked: { ...state.checked, [value]: e.target.checked }
		}));

		const { checked } = options;
		checked[value] = e.target.checked;
		const values = Object.values(checked);
		if (values.length === groupKey.length && values.every(v => v)) {
			setOptions({ ...options, checkAll: true });
		} else {
			setOptions({ ...options, checkAll: false });
		}
	};

	console.log("checked", options.checked);

	return (
		<>
			<tr>
				<td>
					<Checkbox
						onChange={e => onCheckAllChange(e, detailObj.data)}
						checked={options.checkAll}
					>
						{detailObj.user}
					</Checkbox>
				</td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			{detailObj.data.map((detail, index) => (
				<tr key={index}>
					<td>
						<Checkbox
							onChange={e => onChange(e, detail.productId, detailObj.data)}
							value={detail.productId}
							checked={options.checked[detail.productId]}
						></Checkbox>
					</td>
					<td className="thumbnail-img">
						<span>
							<img
								className="img-fluid"
								src={detail.product.images[0]?.path}
								alt=""
							/>
						</span>
					</td>
					<td className="name-pr">
						<span
							onClick={() =>
								history.push({
									pathname: "/product-detail",
									search: `?id=${detail.productId}`
								})
							}
						>
							{detail.product.name}
						</span>
					</td>
					<td className="price-pr">
						<p>${detail.price}</p>
					</td>
					<td className="quantity-box">
						<input
							type="number"
							size="4"
							value={detail.quantity}
							min="1"
							max={detail.product.quantity}
							step="1"
							className="c-input-text qty text"
							onKeyDown={e => {
								if (e.key === "." || e.key === "-" || e.key === "+") {
									e.preventDefault();
								}
							}}
							onBlur={e => {
								const value = parseInt(e.target.value);
								if (!value && value !== 0) {
									error("Lỗi", "Vui lòng nhập số lượng", "Đồng ý", () => {
										dispatch(
											editCartDetail({
												productId: detail.productId,
												cartId: detail.cartId,
												quantity: 1
											})
										);
									});
								}
								if (value < 1) {
									error(
										"Lỗi",
										"Bạn phải chọn tối thiểu 1 sản phẩm",
										"Đồng ý",
										() => {
											dispatch(
												editCartDetail({
													productId: detail.productId,
													cartId: detail.cartId,
													quantity: 1
												})
											);
										}
									);
								}
								if (value > detail.product.quantity) {
									error(
										"Lỗi",
										`Bạn chỉ có thể mua tối đa ${detail.product.quantity} sản phẩm`,
										"Đồng ý",
										() => {
											dispatch(
												editCartDetail({
													productId: detail.productId,
													cartId: detail.cartId,
													quantity: detail.product.quantity
												})
											);
										}
									);
								}
							}}
							onChange={async e => {
								// try {
								// 	const response = await cartDetailAPI.editQuantity(
								// 		{
								// 			productId: detail.productId,
								// 			cartId: detail.cartId,
								// 			quantity: e.target.value
								// 		}
								// 	);
								// 	await fetchCart();
								// } catch (error) {
								// 	showError("Failed to edit");
								// }
								const value = parseInt(e.target.value);
								dispatch(
									editCartDetail({
										productId: detail.productId,
										cartId: detail.cartId,
										quantity: value
									})
								);
							}}
						/>
					</td>
					<td className="total-pr">
						<p>${detail.price * detail.quantity}</p>
					</td>
					<td className="remove-pr">
						<button
							className="btn btn-remove"
							// onClick={async () => {
							// 	try {
							// 		const response = await cartDetailAPI.delete(
							// 			{
							// 				productId: detail.productId,
							// 				cartId: detail.cartId
							// 			}
							// 		);
							// 		await fetchCart();
							// 		showSuccess("Xóa sản phẩm khỏi giỏ hàng");
							// 	} catch (error) {
							// 		showError("Failed to delete");
							// 	}
							// }}
							onClick={() => {
								dispatch(
									deleteCartDetail({
										productId: detail.productId,
										cartId: detail.cartId
									})
								);
								showSuccess("Xóa sản phẩm khỏi giỏ hàng");
							}}
						>
							<i className="fas fa-times"></i>
						</button>
					</td>
				</tr>
			))}
		</>
	);
};

export default CartDetail;
