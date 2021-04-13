import React, { useState } from "react";
import calTotal from "utils/calTotal";

import "antd/dist/antd.css";
import { Select } from "antd";
const { Option } = Select;

const OrderByOwner = ({ detailObj, trans = [] }) => {
	const [transId, setTransId] = useState(1);
	const handleChange = value => {
		console.log(`selected ${value}`);
		setTransId(value);
	};

	return (
		<div className="row">
			<div className="col-md-12 col-lg-12">
				<div className="odr-box">
					<div className="title-left">
						<h3>{detailObj.user}</h3>
					</div>
					<div className="rounded p-2 bg-light">
						{detailObj.data.map((cartDetail, index) => (
							<div className="media mb-2 border-bottom" key={index}>
								<div className="media-body">
									{" "}
									<a href="detail.html">{cartDetail.product.name}</a>
									<div className="small text-muted">
										Giá: ${cartDetail.price} <span className="mx-2">|</span> Số
										lượng: {cartDetail.quantity} <span className="mx-2">|</span>{" "}
										Tổng: ${cartDetail.price * cartDetail.quantity}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="col-md-12 col-lg-12">
				<div className="shipping-method-box">
					<div className="title-left">
						<h3>Phương thức vận chuyển</h3>
					</div>
					<div className="mb-4">
						<Select
							defaultValue={trans[0]?.id}
							style={{ width: "100%" }}
							onChange={handleChange}
						>
							<Option value={trans[0]?.id}>{trans[0]?.name}</Option>
							<Option value={trans[1]?.id}>{trans[1]?.name}</Option>
						</Select>
						{/* <div className="custom-control custom-radio">
							<input
								id="shippingOption1"
								name="shipping-option"
								className="custom-control-input"
								checked="checked"
								type="radio"
								onChange={() => {
									setTransId(1);
								}}
							/>
							<label className="custom-control-label" htmlFor="shippingOption1">
								{trans[0]?.name}
							</label>{" "}
							<span className="float-right font-weight-bold">
								${trans[0]?.cost}
							</span>{" "}
						</div>
						<div className="ml-4 mb-2 small">(3-7 ngày)</div>
						<div className="custom-control custom-radio">
							<input
								id="shippingOption2"
								name="shipping-option"
								className="custom-control-input"
								type="radio"
								onChange={() => {
									setTransId(2);
								}}
							/>
							<label className="custom-control-label" htmlFor="shippingOption2">
								{trans[1]?.name}
							</label>{" "}
							<span className="float-right font-weight-bold">
								${trans[1]?.cost}
							</span>{" "}
						</div>
						<div className="ml-4 mb-2 small">(2-4 ngày)</div> */}
					</div>
				</div>
			</div>
			<div className="col-md-12 col-lg-12">
				<div className="order-box">
					<div className="title-left">
						<h3>Đơn hàng</h3>
					</div>
					<div className="d-flex">
						<h4>Tổng tiền hàng</h4>
						<div className="ml-auto font-weight-bold">
							${calTotal(detailObj.data)}
						</div>
					</div>
					<div className="d-flex">
						<h4>Phí vận chuyển</h4>
						<div className="ml-auto font-weight-bold">
							${trans[transId - 1]?.cost}
						</div>
					</div>
					<hr />
					<div className="d-flex">
						<h4>Tổng cộng</h4>
						<div className="ml-auto font-weight-bold total">
							${calTotal(detailObj.data) + trans[transId - 1]?.cost}
						</div>
					</div>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default OrderByOwner;
