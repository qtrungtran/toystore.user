import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
	Container,
	Avatar,
	Box,
	Card,
	CardContent,
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	makeStyles
} from "@material-ui/core";
import { localAuthenticate } from "utils/localAuth";
import formatDate from "utils/formatDate";
import calTotal from "utils/calTotal";
import orderAPI from "api/order";
import productAPI from "api/product";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3)
	},
	revenueWrapper: {
		padding: "0 12px"
	},
	revenue: {
		fontSize: 20,
		fontWeight: 700,
		display: "flex",
		justifyContent: "space-between",
		padding: "0 16px"
	}
}));

const Statistics = () => {
	const classes = useStyles();
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const ownerId = tokenInfo.payload.id;
	const [orders, setOrders] = useState([]);
	const [revenue, setRevenue] = useState(0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [count, setCount] = useState(0);
	const [total, setTotal] = useState(0);
	const [totalPro, setTotalPro] = useState(0);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		fetchOrders();
	}, [page, rowsPerPage]);

	const fetchOrders = async () => {
		try {
			const params = {
				page: page + 1,
				limit: rowsPerPage,
				status: 4,
				status2: 10,
				// startDate: "2020-12-10",
				// endDate: "2020-12-22",
				ownerId: ownerId
				// type: typeValue,
				// search: search
			};
			const response = await orderAPI.getPerPage({ params: params });
			const orders = await response.data.result.dataInPage;
			setOrders(orders);
			setRevenue(response.data.revenue);
			setRowsPerPage(params.limit);
			setCount(response.data.result.total);
		} catch (error) {
			console.log("Failed to fetch orders: ", error);
		}
	};

	useEffect(() => {
		const fetchTotal = async () => {
			try {
				const response = await orderAPI.getByOwner();
				console.log({ response });
				setTotal(response.data.total);
			} catch (error) {
				console.log("Failed to fetch orders: ", error);
			}
		};
		fetchTotal();
	});

	useEffect(() => {
		const fetchTotalPro = async () => {
			try {
				const response = await productAPI.getByUser();
				console.log({ response });
				setTotalPro(response.data.total);
			} catch (error) {
				console.log("Failed to fetch orders: ", error);
			}
		};
		fetchTotalPro();
	});

	console.log({ tokenInfo });

	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={6} sm={6} xl={3} xs={12}>
					<Card className={clsx(classes.root)}>
						<CardContent>
							<Grid container justify="space-between" spacing={3}>
								<Grid item>
									<Typography gutterBottom variant="h6">
										Sản phẩm
									</Typography>
									<Typography variant="h3">{totalPro}</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item lg={6} sm={6} xl={3} xs={12}>
					<Card className={clsx(classes.root)}>
						<CardContent>
							<Grid container justify="space-between" spacing={3}>
								<Grid item>
									<Typography gutterBottom variant="h6">
										Tổng đơn hàng
									</Typography>
									<Typography variant="h3">{total}</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid xs={12} className={classes.revenueWrapper}>
					<Typography gutterBottom variant="h6">
						Doanh thu
					</Typography>
					<TableContainer component={Paper}>
						<Table aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell align="center" colSpan={3}>
										Thông tin chi tiết
									</TableCell>
									<TableCell align="right">Doanh thu</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Mã đơn hàng</TableCell>
									<TableCell>Khách hàng</TableCell>
									<TableCell>Ngày giao hàng</TableCell>
									<TableCell align="right">Tiền hàng</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map(order => (
									<TableRow key={order.id}>
										<TableCell>{order.id}</TableCell>
										<TableCell>{order.user.username}</TableCell>
										<TableCell>{formatDate(order.updatedAt)}</TableCell>
										<TableCell align="right">
											${calTotal(order.orderDetails)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={count}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
					<div className={classes.revenue}>
						<div>Tổng doanh thu</div>
						<div>${revenue}</div>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Statistics;
