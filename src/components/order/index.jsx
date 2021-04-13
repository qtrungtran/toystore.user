import React from "react";
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
	},
	accor: {
		color: "white"
	}
}));

const Order = ({ orders, fetchOrder }) => {
	const classes = useStyles();
	const { showError, showSuccess } = useNotification();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			{orders.map((order, index) => (
				<Accordion
					expanded={expanded === `panel${index + 1}`}
					onChange={handleChange(`panel${index + 1}`)}
					key={index}
					className={classes.accor}
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
								src={order.orderDetails[0].product.user.avatar}
							/>
							<Typography className={classes.username}>
								{order.orderDetails[0].product.user.username}
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
										<OrderDetail key={index} orderDetail={detail} />
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
														const statusId = 2;
														const response = await orderAPI.editStatus(
															{
																statusId
															},
															order.id
														);
														await orderHistoryAPI.add({
															orderId: order.id,
															name: "Đơn hàng đã được xác nhận"
														});
														fetchOrder();
														showSuccess("Đã xác nhận đơn hàng");
													} catch (error) {
														showError("Không thành công");
													}
												}}
											>
												Xác nhận đơn hàng
											</button>
											<button
												className="order-action reject"
												onClick={async () => {
													console.log("statusId: ", order.statusId);
													try {
														const statusId = 5;
														const response = await orderAPI.editStatus(
															{
																statusId
															},
															order.id
														);
														await orderHistoryAPI.add({
															orderId: order.id,
															name: "Đơn hàng bị từ chối"
														});
														fetchOrder();
														showSuccess("Đã từ chối đơn hàng");
													} catch (error) {
														showError("Không thành công");
													}
												}}
											>
												Từ chối đơn hàng
											</button>
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

export default Order;
