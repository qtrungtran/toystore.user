import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	makeStyles
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TextInput from "components/inputs/TextInput";
import clsx from "clsx";
import reviewAPI from "api/review";
import useNotification from "utils/hooks/notification";
import formatDate from "utils/formatDate";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import productAPI from "api/product";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		backgroundColor: "#f5f5f5"
	},
	details: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		marginLeft: 172
	},
	content: {
		flex: "1 0 auto"
	},
	text: {
		fontFamily: "Montserrat"
	},
	name: {
		fontWeight: 700,
		color: "#010101",
		fontSize: 18,
		height: 73
	},
	quantity: {
		fontSize: 15,
		color: "#666666",
		textAlign: "right"
	},
	total: {
		fontSize: 18,
		color: "#d33b33",
		textAlign: "right"
	},
	sold: {
		color: "#d33b33"
	},
	date: {
		fontSize: 13,
		color: "#666666"
	},
	icon: {
		display: "flex !important",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	},
	cover: {
		width: "172px !important"
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	},
	rating: {
		"& span label": {
			marginTop: 4
		}
	},
	content: {
		"& > *": {
			color: "#666666",
			fontFamily: "Montserrat"
		}
	}
}));

const OrderDetail = ({ orderDetail, orderStatus }) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const { showError, showSuccess } = useNotification();
	const [reviewOpen, setReviewOpen] = useState(false);
	const [star, setStar] = useState(0);

	return (
		<>
			<div className="products-single">
				<div className="box-img-hover">
					<Card className={classes.root}>
						<img
							className={classes.cover}
							src={orderDetail.product.images[0].path}
							// title="Live from space album cover"
						/>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography
									component="h5"
									variant="h5"
									className={clsx(classes.text, classes.name)}
								>
									{orderDetail.product.name}
								</Typography>
								<Typography
									variant="subtitle1"
									className={clsx(classes.text, classes.quantity)}
								>
									x{orderDetail.quantity}
								</Typography>
								<Typography
									variant="subtitle1"
									className={clsx(classes.text, classes.total)}
								>
									{orderDetail.quantity * orderDetail.price}
								</Typography>
								{/* <Typography
								variant='subtitle1'
								className={clsx(classes.text, classes.date)}
							>
								Ngày đăng: {formatDate(product.createdAt)}
							</Typography> */}
							</CardContent>
							{/* <div className={classes.controls}>
					<IconButton aria-label='previous'>
						{theme.direction === 'rtl' ? (
							<SkipNextIcon />
						) : (
							<SkipPreviousIcon />
						)}
					</IconButton>
					<IconButton aria-label='play/pause'>
						<PlayArrowIcon className={classes.playIcon} />
					</IconButton>
					<IconButton aria-label='next'>
						{theme.direction === 'rtl' ? (
							<SkipPreviousIcon />
						) : (
							<SkipNextIcon />
						)}
					</IconButton>
				</div> */}
						</div>
					</Card>
					<div className="mask-icon">
						<ul className={classes.icon}>
							<li>
								<a
									onClick={e => {
										e.preventDefault();
										history.push({
											pathname: "/product-detail",
											search: `?id=${orderDetail.productId}`
										});
									}}
									href="/product-detail"
									data-toggle="tooltip"
									data-placement="right"
									title="View"
								>
									<i className="fas fa-eye"></i>
								</a>
							</li>
							{orderStatus === 4 && (
								<li>
									<button
										onClick={() => setReviewOpen(pre => !pre)}
										data-toggle="tooltip"
										data-placement="right"
										title="Review"
									>
										<i className="fas fa-list-alt"></i>
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
			{reviewOpen && (
				<div className="review-area">
					<Formik
						initialValues={{
							content: ""
						}}
						// validationSchema={Yup.object().shape({
						// 	content: Yup.string().required('Content is required')
						// })}
						onSubmit={async ({ content }, { setSubmitting }) => {
							try {
								const response = await reviewAPI.add({
									productId: orderDetail.productId,
									content,
									star: star
								});
								// await fetchCart();
								setReviewOpen(false);
								showSuccess("Added successfully.");
							} catch (error) {
								showError("Failed to review.");
							}
						}}
					>
						{({ isSubmitting }) => (
							<>
								<div className="title-left">
									<h3>Đánh giá của bạn</h3>
								</div>
								<Form>
									{/* <Rating
										name='half-rating'
										value={star}
										precision={0.5}
										className={classes.rating}
										onChange={event => setStar(event.target.value)}
									/> */}
									<Rating
										name="simple-controlled"
										value={star}
										onChange={(event, newValue) => {
											setStar(newValue);
										}}
									/>
									<Field
										label="Nội dung đánh giá"
										margin="normal"
										name="content"
										component={TextInput}
										fullWidth
										multiline
										rows={5}
										variant="outlined"
										className={classes.content}
									/>
									<button
										type="submit"
										className="btn hvr-hover btn-review"
										disabled={!star}
									>
										Gửi đánh giá
									</button>
								</Form>
							</>
						)}
					</Formik>
				</div>
			)}
		</>
	);
};

export default OrderDetail;
