import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import calTotal from "utils/calTotal";
import useNotification from "utils/hooks/notification";
import { useDispatch } from "react-redux";
import _ from "lodash";
import "antd/dist/antd.css";
import { Checkbox, Modal } from "antd";
import { deleteCartDetail, editCartDetail } from "features/cartSlice";

const error = (title, content, ok, onOk) => {
	Modal.error({
		title: title,
		content: content,
		okText: ok,
		onOk: onOk
	});
};

const Cart = ({ cartDetails = [], fetchCart }) => {
	const history = useHistory();
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();

	const users = [];
	for (let detail of cartDetails) {
		console.log("hiiii: ", detail.product.user.username);
		if (_.indexOf(users, detail.product.user.username) === -1) {
			users.push(detail.product.user.username);
		}
		console.log("ss: ", users);
	}
	const cartDetailsByOwner = users.map(user => {
		const data = [];
		for (let detail of cartDetails) {
			if (user === detail.product.user.username) {
				data.push(detail);
			}
		}
		return {
			user,
			data
		};
	});

	// new
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

	console.log("cartDetails", cartDetails);
	console.log("options", options);

	const selectedIndexProducts = [];
	for (let key in options.checked) {
		if (options.checked[key] === true) {
			selectedIndexProducts.push(parseInt(key));
		}
	}

	const selectedProducts = selectedIndexProducts.map(item => {
		for (let detail of cartDetails) {
			if (item === detail.productId) {
				return { ...detail };
			}
		}
	});

	console.log("cartDetailsByOwner", cartDetailsByOwner);
	console.log("selectedIndexProducts", selectedIndexProducts);
	console.log("selectedProducts", selectedProducts);
	return (
		<div className="cart-box-main">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="table-main table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th></th>
										<th>Hình ảnh</th>
										<th>Tên sản phẩm</th>
										<th>Giá</th>
										<th>Số lượng</th>
										<th>Tổng</th>
										<th>Xóa</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<Checkbox
												onChange={e => onCheckAllChange(e, cartDetails)}
												checked={options.checkAll}
											>
												Tất cả
											</Checkbox>
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									{cartDetailsByOwner.length > 0 &&
										cartDetailsByOwner.map((detailObj, index) => {
											return (
												<>
													<tr key={index}>
														<td>{detailObj.user}</td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
													</tr>
													{detailObj.data.map((detail, i) => (
														<tr key={i}>
															<td>
																<Checkbox
																	onChange={e =>
																		onChange(e, detail.productId, cartDetails)
																	}
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
																		if (
																			e.key === "." ||
																			e.key === "-" ||
																			e.key === "+"
																		) {
																			e.preventDefault();
																		}
																	}}
																	onBlur={e => {
																		const value = parseInt(e.target.value);
																		if (!value && value !== 0) {
																			error(
																				"Lỗi",
																				"Vui lòng nhập số lượng",
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
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className="row my-5">
					<div className="col-lg-8 col-sm-12"></div>
					<div className="col-lg-4 col-sm-12">
						<div className="order-box">
							<hr />
							<div className="d-flex gr-total">
								<h5>Tổng tiền</h5>
								<div className="ml-auto h5">${calTotal(selectedProducts)}</div>
							</div>
							<hr />{" "}
						</div>
					</div>
					<div className="col-12 d-flex shopping-box">
						<a
							onClick={e => {
								e.preventDefault();

								// for (let i of selectedProducts) {
								// 	if (i.quantity > i.product.quantity) {
								// 		error(
								// 			"Lỗi",
								// 			`Bạn chỉ có thể mua tối đa ${i.product.quantity} sản phẩm`,
								// 			"Đồng ý",
								// 			() => {
								// 				dispatch(
								// 					editCartDetail({
								// 						productId: i.productId,
								// 						cartId: i.cartId,
								// 						quantity: i.product.quantity
								// 					})
								// 				);
								// 			}
								// 		);
								// 		return;
								// 	}
								// }
								history.push({
									pathname: "/checkout",
									state: { data: selectedProducts }
								});
							}}
							href="/checkout"
							className={`ml-auto btn hvr-hover ${
								selectedIndexProducts.length === 0 && "disabled"
							}`}
							// disabled
						>
							Mua hàng
						</a>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
