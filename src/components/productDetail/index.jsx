import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";
import "antd/dist/antd.css";
import useNotification from "utils/hooks/notification";
import cartDetailAPI from "api/cartDetail";
import ReviewList from "../reviewList";

const error = (title, content, ok, onOk) => {
	Modal.error({
		title: title,
		content: content,
		okText: ok,
		onOk: onOk
	});
};

// const confirm = (title, content, ok, cancel, onOk) => {
// 	Modal.confirm({
// 		title: title,
// 		content: content,
// 		okText: ok,
// 		cancelText: cancel,
// 		onOk: onOk,
// 		onCancel() {}
// 	});
// };

const ProductDetail = ({
	id,
	name,
	price,
	description,
	images,
	user,
	category,
	avaQuantity,
	sold,
	cartId,
	isAuthenticated,
	fetchCart,
	reviews
}) => {
	const { showError, showSuccess } = useNotification();
	const { cart } = useSelector(state => state.cart);
	const history = useHistory();
	const cartDetails = cart.cartDetails;
	const [currentQuantity, setCurrentQuantity] = useState(1);

	return (
		<div className="shop-detail-box-main">
			<div className="container">
				<div className="row">
					<div className="col-xl-5 col-lg-5 col-md-6">
						<div
							id="carousel-example-1"
							className="single-product-slider carousel slide"
							data-ride="carousel"
						>
							<div className="carousel-inner" role="listbox">
								<div className="carousel-item active">
									{" "}
									<img
										className="d-block w-100"
										src={
											images.length > 0
												? images[0].path
												: "https://picsum.photos/400"
										}
										alt="Slide 1"
									/>{" "}
								</div>
								{images.slice(1).map((image, index) => (
									<div className="carousel-item" key={index}>
										{" "}
										<img
											className="d-block w-100"
											src={image.path}
											alt={`Slide ${index + 2}`}
										/>{" "}
									</div>
								))}
							</div>
							<a
								className="carousel-control-prev"
								href="#carousel-example-1"
								role="button"
								data-slide="prev"
							>
								<i className="fa fa-angle-left" aria-hidden="true"></i>
								<span className="sr-only">Previous</span>
							</a>
							<a
								className="carousel-control-next"
								href="#carousel-example-1"
								role="button"
								data-slide="next"
							>
								<i className="fa fa-angle-right" aria-hidden="true"></i>
								<span className="sr-only">Next</span>
							</a>
							<ol className="carousel-indicators">
								<li
									data-target="#carousel-example-1"
									data-slide-to="0"
									className="active"
								>
									<img
										className="d-block w-100 img-fluid"
										src={
											images.length > 0
												? images[0].path
												: "https://picsum.photos/400"
										}
										alt=""
									/>
								</li>
								{images.slice(1).map((image, index) => (
									<li
										data-target="#carousel-example-1"
										data-slide-to={index + 1}
										key={index}
									>
										<img
											className="d-block w-100 img-fluid"
											src={image.path}
											alt=""
										/>
									</li>
								))}
							</ol>
						</div>
					</div>
					<div className="col-xl-7 col-lg-7 col-md-6">
						<div className="single-product-details">
							<h2>{name}</h2>
							<h5>${price}</h5>
							<p className="available-stock">
								<span>
									{" "}
									S??? l?????ng: c?? s???n {avaQuantity} /
									<span style={{ color: "#d33b33" }}> ???? b??n {sold}</span>
								</span>
							</p>
							<h4>M?? t??? s???n ph???m:</h4>
							<p>{description}</p>
							<ul>
								<li>
									<div className="form-group quantity-box">
										<label className="control-label">S??? l?????ng</label>
										<input
											type="number"
											value={currentQuantity}
											min="1"
											max={avaQuantity}
											step="1"
											className="form-control"
											onKeyDown={e => {
												if (e.key === "." || e.key === "-" || e.key === "+") {
													e.preventDefault();
												}
											}}
											onChange={e =>
												setCurrentQuantity(parseInt(e.target.value))
											}
										/>
									</div>
								</li>
							</ul>

							<div className="price-box-bar">
								<div className="cart-and-bay-btn">
									{/* <a
													className='btn hvr-hover'
													data-fancybox-close=''
													href='/'
												>
													Mua ngay
												</a> */}
									<button
										className="btn hvr-hover"
										onClick={async () => {
											if (!isAuthenticated) {
												showError("Vui l??ng ????ng nh???p ????? ti???p t???c");
												return;
											}
											if (currentQuantity === "") {
												error("L???i", "Vui l??ng nh???p s??? l?????ng", "?????ng ??", () => {
													setCurrentQuantity(1);
												});
												return;
											}
											const index = cartDetails.findIndex(
												detail =>
													detail.productId === id && detail.cartId === cartId
											);
											let allowQuantity;
											if (index !== -1) {
												allowQuantity =
													avaQuantity - cartDetails[index].quantity;
												if (currentQuantity < 1) {
													error(
														"L???i",
														"B???n ph???i ch???n t???i thi???u 1 s???n ph???m",
														"?????ng ??",
														() => {
															setCurrentQuantity(1);
														}
													);
													return;
												}
												if (allowQuantity < 1) {
													error(
														"L???i",
														"B???n kh??ng th??? th??m s???n ph???m",
														"?????ng ??",
														() => {}
													);
													return;
												}
												if (currentQuantity > allowQuantity) {
													error(
														"L???i",
														`B???n ch??? c?? th??? mua t???i ??a th??m ${allowQuantity} s???n ph???m`,
														"?????ng ??",
														() => {
															setCurrentQuantity(allowQuantity);
														}
													);
													return;
												}
											} else {
												if (currentQuantity < 1) {
													error(
														"L???i",
														"B???n ph???i ch???n t???i thi???u 1 s???n ph???m",
														"?????ng ??",
														() => {
															setCurrentQuantity(1);
														}
													);
													return;
												}
												if (currentQuantity > avaQuantity) {
													error(
														"L???i",
														`B???n ch??? c?? th??? mua t???i ??a ${avaQuantity} s???n ph???m`,
														"?????ng ??",
														() => {
															setCurrentQuantity(avaQuantity);
														}
													);
													return;
												}
											}
											try {
												const response = await cartDetailAPI.add({
													productId: id,
													cartId,
													quantity: currentQuantity,
													price
												});
												await fetchCart();
												showSuccess("???? th??m v??o gi??? h??ng");
											} catch (error) {
												showError("Kh??ng th??? th??m v??o gi??? h??ng");
											}
										}}
									>
										Th??m v??o gi??? h??ng
									</button>
								</div>
							</div>

							<div className="shop-info">Th??ng tin c???a h??ng:</div>
							<div className="owner">
								<div className="avatar">
									<img src={user.avatar} alt="" />
								</div>
								<div className="info">
									<div>{user.username}</div>
									<div>{user.address}</div>
									<div>{user.phoneNumber}</div>
									<div>{user.email}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row my-5">
					<div className="col-12">
						<div className="review-title">????nh gi?? s???n ph???m:</div>
						{reviews.length > 0 ? (
							<ReviewList reviews={reviews} />
						) : (
							"Ch??a c?? ????nh gi??"
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
