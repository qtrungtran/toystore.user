import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography
} from "@material-ui/core";
import clsx from "clsx";
import formatDate from "utils/formatDate";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		backgroundColor: "#f5f5f5"
	},
	details: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 197
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
		height: 73,
		fontSize: 18
	},
	price: {
		fontWeight: 700,
		fontSize: 18,
		color: "#d33b33"
	},
	quantity: {
		fontSize: 15,
		color: "#666666"
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
		width: "197px !important"
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
	}
}));

const MyProduct = ({ product, handleDeleteProduct, toggleEditProduct }) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div className="products-single">
			<div className="box-img-hover">
				<Card className={classes.root}>
					<img
						className={classes.cover}
						src={
							product.images.length > 0 &&
							product.images.filter(i => !i.isDeleted)[0].path
						}
						// title="Live from space album cover"
					/>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Typography
								component="h5"
								variant="h5"
								className={clsx(classes.text, classes.name)}
							>
								{product.name}
							</Typography>
							<Typography
								variant="subtitle1"
								className={clsx(classes.text, classes.price)}
							>
								Giá: ${product.price}
							</Typography>
							<Typography
								variant="subtitle1"
								className={clsx(classes.text, classes.quantity)}
							>
								Số lượng: có sẵn {product.quantity} /{" "}
								<span className={clsx(classes.text, classes.sold)}>
									đã bán {product.orderDetails.length}
								</span>
							</Typography>
							<Typography
								variant="subtitle1"
								className={clsx(classes.text, classes.date)}
							>
								Ngày đăng: {formatDate(product.createdAt)}
							</Typography>
						</CardContent>
					</div>
				</Card>
				<div className="mask-icon">
					<ul className={classes.icon}>
						<li>
							<button
								onClick={() => toggleEditProduct()}
								href="/product-detail"
								data-toggle="tooltip"
								data-placement="right"
								title="Chỉnh sửa"
							>
								<i className="fas fa-edit"></i>
							</button>
						</li>
						<li>
							<button
								onClick={() => handleDeleteProduct(product.id)}
								data-toggle="tooltip"
								data-placement="right"
								title="Xóa"
							>
								<i className="fas fa-trash-alt"></i>
							</button>
						</li>
						{/* <li>
							<a
								href='/'
								data-toggle='tooltip'
								data-placement='right'
								title='Add to Wishlist'
							>
								<i className='far fa-heart'></i>
							</a>
						</li> */}
					</ul>
					{/* <button
						className='cart'
						onClick={async () => {
							// if (!isAuthenticated) {
							// 	showError('Please login to continue.');
							// 	return;
							// }
							// try {
							// 	const quantity = 1;
							// 	const response = await cartDetailAPI.add({
							// 		productId: id,
							// 		cartId,
							// 		quantity,
							// 		price
							// 	});
							// 	await fetchCart();
							// 	showSuccess('Added successfully.');
							// } catch (error) {
							// 	showError('Failed to add to cart.');
							// }
						}}
					>
						Add to Cart
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default MyProduct;
