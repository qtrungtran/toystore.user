import React, { useEffect } from "react";
import {
	Avatar,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	Card,
	CardContent,
	Divider,
	makeStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderDetail from "../orderDetail";
import calTotal from "utils/calTotal";
import formatDate from "utils/formatDate";
import orderAPI from "api/order";
import useNotification from "utils/hooks/notification";
import transactionAPI from "api/transaction";
import payoutAPI from "api/payout";
import orderHistoryAPI from "api/orderHistory";
import "antd/dist/antd.css";
import { Steps } from "antd";

const { Step } = Steps;

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	summary: {
		display: "flex",
		alignItems: "center"
	},
	avatar: {
		marginRight: 20
	},
	username: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginRight: 40
	},
	quantity: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: "#d33b33"
	},
	total: {
		fontFamily: "Montserrat",
		lineHeight: "normal",
		fontSize: 18,
		color: "#d33b33",
		display: "flex",
		justifyContent: "space-between"
	},
	line: {
		marginTop: 20,
		marginBottom: 20
	},
	title: {
		fontFamily: "Montserrat",
		fontSize: 18,
		color: "#d33b33"
	},
	address: {
		fontFamily: "Montserrat",
		fontSize: "#666666 !important"
	},
	date: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginLeft: 60
	}
}));

const MyOrder = ({ orders, fetchOrder }) => {
	const classes = useStyles();
	const [isOpen, setOpen] = React.useState(false);
	const [note, setNote] = React.useState("");
	const [expanded, setExpanded] = React.useState(false);
	const { showError, showSuccess } = useNotification();
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const createTransaction = async transaction => {
		try {
			// const response = await payoutAPI.payout({ amount: transaction.amount });
			// console.log({ response });
			// transaction.payoutId = response.data;
			await transactionAPI.add(transaction);
		} catch (error) {
			console.log("Failed to create transaction: ", error);
		}
	};

	const isReturn = order => {
		const now = new Date();
		const inOrder = new Date(order.updatedAt);
		if (now.getTime() - inOrder.getTime() > 259200000) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		const autoDestroy = async order => {
			try {
				const statusId = 6;
				const response = await orderAPI.editStatus(
					{
						statusId
					},
					order.id
				);
				await orderHistoryAPI.add({
					orderId: order.id,
					name: "Đơn hàng đã bị hủy",
					note: null
				});
				fetchOrder();
			} catch (error) {
				showError("Không thành công");
			}
		};
		for (let i of orders) {
			const now = new Date();
			const onCheckout = new Date(i.updatedAt);
			if (i.statusId === 7 && now.getTime() - onCheckout.getTime() > 86400000) {
				autoDestroy(i);
			}
		}
	});

	console.log({ note });

	return (
		<div className={classes.root}>
			{orders.map((order, index) => (
				<Accordion
					expanded={expanded === `panel${index + 1}`}
					onChange={handleChange(`panel${index + 1}`)}
					key={index}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index + 1}bh-content`}
						id={`panel${index + 1}bh-header`}
						c
					>
						<div className={classes.summary}>
							<Typography className={classes.username}>
								Đơn hàng {order.id}
							</Typography>
							<Avatar
								alt=""
								className={classes.avatar}
								src={order.orderDetails[0]?.product.user.avatar}
							/>
							<Typography className={classes.username}>
								{order.orderDetails[0]?.product.user.username}
							</Typography>
							<Typography className={classes.quantity}>
								{order.orderDetails.length} sản phẩm
							</Typography>
							<Typography className={classes.date}>
								{formatDate(order.createdAt)}
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 col-md-12">
									{order.orderDetails.map((detail, index) => (
										<OrderDetail
											key={index}
											orderDetail={detail}
											orderStatus={order.statusId}
										/>
									))}
									<Steps progressDot current={0} direction="vertical">
										{order.orderHistories
											.sort((a, b) => {
												return (
													new Date(b.createdAt).getTime() -
													new Date(a.createdAt).getTime()
												);
											})
											.map((history, index) => (
												<Step
													key={index}
													title={history.name}
													description={formatDate(history.createdAt)}
												/>
											))}
									</Steps>
								</div>
								<div className="col-lg-6 col-md-12 detail">
									<Typography className={classes.total}>
										Tổng tiền hàng: <span>${calTotal(order.orderDetails)}</span>
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Phí vận chuyển: <span>${order.transportation.cost}</span>
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Tổng cộng:{" "}
										<span>
											$
											{calTotal(order.orderDetails) + order.transportation.cost}
										</span>
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Phương thức thanh toán: {order.paymentMethod}
									</Typography>
									<Divider className={classes.line} />
									<Card>
										<CardContent>
											<Typography className={classes.title} gutterBottom>
												Địa chỉ nhận hàng
											</Typography>
											<Typography className={classes.address}>
												{order.user.username}
											</Typography>
											<Typography className={classes.address}>
												{order.deliveryPhoneNumber}
											</Typography>
											<Typography className={classes.address}>
												{order.deliveryAddress}
											</Typography>
										</CardContent>
									</Card>
									{order.statusId === 1 && (
										<>
											<Divider className={classes.line} />
											<button
												className="order-action"
												onClick={async () => {
													console.log("statusId: ", order.statusId);
													try {
														const statusId = 6;
														const response = await orderAPI.editStatus(
															{
																statusId
															},
															order.id
														);
														await orderHistoryAPI.add({
															orderId: order.id,
															name: "Đơn hàng đã bị hủy"
														});
														fetchOrder();
														if (order.paymentMethod === "Paypal") {
															const response = await payoutAPI.payout({
																amount:
																	calTotal(order.orderDetails) +
																	order.transportation.cost
															});
															createTransaction({
																userId: order.userId,
																orderId: order.id,
																payoutId: response.data,
																amount:
																	calTotal(order.orderDetails) +
																	order.transportation.cost,
																status: "Đang xử lý"
															});
														}
														showSuccess("Đã hủy đơn hàng");
													} catch (error) {
														showError("Không thành công");
													}
												}}
											>
												Hủy đơn hàng
											</button>
										</>
									)}
									{order.statusId === 4 && isReturn(order) && (
										<>
											<Divider className={classes.line} />
											{!isOpen && (
												<button
													className="order-action"
													onClick={() => setOpen(true)}
													// onClick={async () => {
													// 	console.log("statusId: ", order.statusId);
													// 	try {
													// 		const statusId = 8;
													// 		const response = await orderAPI.editStatus(
													// 			{
													// 				statusId
													// 			},
													// 			order.id
													// 		);
													// 		await orderHistoryAPI.add({
													// 			orderId: order.id,
													// 			name: "Đơn hàng đã bị hủy"
													// 		});
													// 		fetchOrder();
													// 		if (order.paymentMethod === "Paypal") {
													// 			const response = await payoutAPI.payout({
													// 				amount:
													// 					calTotal(order.orderDetails) +
													// 					order.transportation.cost
													// 			});
													// 			createTransaction({
													// 				userId: order.userId,
													// 				orderId: order.id,
													// 				payoutId: response.data,
													// 				amount:
													// 					calTotal(order.orderDetails) +
													// 					order.transportation.cost,
													// 				status: "Đang xử lý"
													// 			});
													// 		}
													// 		showSuccess("Đã hủy đơn hàng");
													// 	} catch (error) {
													// 		showError("Không thành công");
													// 	}
													// }}
												>
													Trả hàng
												</button>
											)}
											{isOpen && (
												<>
													<textarea
														rows={5}
														placeholder="Nhập lý do"
														onChange={e => setNote(e.target.value)}
													/>
													<button
														className="order-action"
														onClick={async () => {
															console.log("statusId: ", order.statusId);
															try {
																const statusId = 11;
																const response = await orderAPI.editStatus(
																	{
																		statusId
																	},
																	order.id
																);
																await orderHistoryAPI.add({
																	orderId: order.id,
																	name: "Chờ xử lý trả hàng",
																	note: note
																});
																fetchOrder();
																// if (order.paymentMethod === "Paypal") {
																// 	const response = await payoutAPI.payout({
																// 		amount:
																// 			calTotal(order.orderDetails) +
																// 			order.transportation.cost
																// 	});
																// 	createTransaction({
																// 		userId: order.userId,
																// 		orderId: order.id,
																// 		payoutId: response.data,
																// 		amount:
																// 			calTotal(order.orderDetails) +
																// 			order.transportation.cost,
																// 		status: "Đang xử lý"
																// 	});
																// }
																showSuccess("Đã gửi yêu cầu trả hàng");
															} catch (error) {
																showError("Không thành công");
															}
														}}
													>
														Gửi
													</button>
												</>
											)}
										</>
									)}
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default MyOrder;
