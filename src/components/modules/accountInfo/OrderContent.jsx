import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	makeStyles,
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box
} from "@material-ui/core";
import TitleBox from "components/titleBox";
import Order from "components/order";
import AddProduct from "components/myProduct/addProduct";
import { localAuthenticate } from "utils/localAuth";
import useNotification from "utils/hooks/notification";
import clsx from "clsx";
import productAPI from "api/product";
import statusAPI from "api/status";
import orderAPI from "api/order";
import CPagination from "components/cPagination";

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

const a11yProps = index => {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`
	};
};

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "#fff",
		minHeight: "100%",
		paddingBottom: theme.spacing(9),
		paddingTop: theme.spacing(9),
		"& .MuiBox-root": {
			padding: 0
		}
	},
	header: {
		backgroundColor: "#d33b33",
		"& span": {
			textTransform: "none"
		}
	}
}));

const OrderContent = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [statuses, setStatuses] = useState([]);
	const [orders, setOrders] = useState([]);

	const [products, setProducts] = useState([]);
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const { showSuccess, showError } = useNotification();
	const [activePage, setActivePage] = useState(1);
	const [pagination, setPagination] = useState({
		activePage: 1,
		itemsCountPerPage: 0,
		totalItemsCount: 0
	});

	const fetchStatus = async () => {
		try {
			const response = await statusAPI.getAll();
			setStatuses(response.data.statuses);
		} catch (error) {
			console.log("Failed to fetch statuses: ", error);
		}
	};

	const handlePageChange = pageNumber => {
		console.log(`active page is ${pageNumber}`);
		setPagination({
			...pagination,
			activePage: pageNumber
		});
	};

	const fetchProduct = async () => {
		try {
			const params = {
				page: pagination.activePage,
				limit: 3
			};
			const response = await productAPI.getByUser({ params: params });
			setProducts(response.data.dataInPage);
			setPagination({
				...pagination,
				itemsCountPerPage: response.data.totalPage,
				totalItemsCount: response.data.total
			});
			console.log("product", products);
		} catch (error) {
			console.log("Failed to fetch products: ", error);
		}
	};

	const fetchOrder = async () => {
		try {
			const params = {
				statusId: value + 1
				// page: pagination.activePage,
				// limit: 3
			};
			const response = await orderAPI.getByOwner({ params: params });
			console.log("params", params);
			console.log("response", response);
			setOrders(response.data.dataInPage);
			// setPagination({
			// 	...pagination,
			// 	itemsCountPerPage: response.data.totalPage,
			// 	totalItemsCount: response.data.total
			// });
		} catch (error) {
			console.log("Failed to fetch orders: ", error);
		}
	};

	useEffect(() => {
		fetchStatus();
	}, []);

	useEffect(() => {
		fetchOrder();
	}, [value]);

	// useEffect(() => {
	// 	fetchProduct();
	// }, [pagination.activePage]);

	const handleDeleteProduct = async id => {
		try {
			const response = await productAPI.delete(id);
			const newProducts = products.filter(
				product => product.id !== response.data.id
			);
			setProducts(newProducts);
			showSuccess("Deleted successfully.");
		} catch (error) {
			showError("Failed to delete");
		}
	};

	return (
		<>
			<TitleBox parent="Trang Chủ" children="Đơn bán" path="/" />
			<div className={clsx(classes.root, "container")}>
				<AppBar position="static" className={classes.header}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="simple tabs example"
					>
						{statuses.map((status, index) => (
							<Tab key={index} label={status.name} {...a11yProps(index)} />
						))}
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={value}>
					{orders.length > 0 ? (
						<Order orders={orders} fetchOrder={fetchOrder} />
					) : (
						"Chưa có đơn hàng"
					)}

					{/* <CPagination {...pagination} handlePageChange={handlePageChange} /> */}
				</TabPanel>
			</div>
		</>
	);
};

export default OrderContent;
