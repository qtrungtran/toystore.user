import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import TitleBox from "components/titleBox";
import Product from "components/product";
import productAPI from "api/product";
import categoryAPI from "api/category";
import { Slider, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getByUser } from "features/cartSlice";
import { localAuthenticate } from "utils/localAuth";
import CPagination from "components/cPagination";
import pro1 from "assets/images/img-pro-01.jpg";
import pro2 from "assets/images/img-pro-02.jpg";
import pro3 from "assets/images/img-pro-03.jpg";

const useStyles = makeStyles({
	root: {
		"& > span": {
			color: "#d33b33",
			height: 10,
			marginTop: -13,
			"& span:nth-child(-n+2)": {
				height: 10,
			},
			"& .MuiSlider-thumb": {
				width: 21,
				height: 21,
				border: "2px solid #fff",
				boxShadow: "0px 0px 6.65px 0.35px rgba(0,0,0,0.15)",
				marginLeft: -10,
				"& > span": {
					display: "none",
				},
			},
			"& .MuiSlider-rail": {
				color: "transparent",
			},
		},
	},
});

const CategoryDetailContent = () => {
	const classes = useStyles();
	const history = useHistory();
	const [categories, setCategories] = useState([]);
	const { isAuthenticated } = localAuthenticate();
	const { search } = useLocation();
	const { id } = qs.parse(search.replace(/^\?/, ""));
	const [products, setProducts] = useState([]);
	const { cart } = useSelector((state) => state.cart);
	const cartId = cart.id;
	const [currentCategoryId, setCurrentCategoryId] = useState(id);
	const dispatch = useDispatch();
	const [sortValue, setSortValue] = useState(0);
	const inputSearch = useRef(null);
	const [searchStr, setSearchStr] = useState("");
	const [pagination, setPagination] = useState({
		activePage: 1,
		itemsCountPerPage: 0,
		totalItemsCount: 0,
	});

	const handlePageChange = (pageNumber) => {
		console.log(`active page is ${pageNumber}`);
		setPagination({
			...pagination,
			activePage: pageNumber,
		});
	};

	const [value, setValue] = useState([1, 1000]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const fetchProductsByCategory = async (id) => {
		try {
			const params = {
				page: pagination.activePage,
				limit: 9,
				type: sortValue,
				search: searchStr,
			};
			const response = await productAPI.getByCategory(id, { params: params });
			const products = await response.data.dataInPage;

			const filteredProducts = products.filter((product) => product.price >= value[0] && product.price <= value[1]);
			setProducts(filteredProducts);
			setPagination({
				...pagination,
				itemsCountPerPage: params.limit,
				totalItemsCount: response.data.total,
			});
		} catch (error) {
			console.log("Failed to fetch product: ", error);
		}
	};

	const fetchCart = () => {
		dispatch(getByUser());
	};

	useEffect(() => {
		fetchProductsByCategory(currentCategoryId, value);
	}, [pagination.activePage, sortValue, currentCategoryId, value, searchStr]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await categoryAPI.getAll();
			setCategories(response.data.categories);
		} catch (error) {
			console.log("Failed to fetch categories: ", error);
		}
	};
	return (
		<>
			<TitleBox parent="Trang chủ" children={`Danh mục ${categories[currentCategoryId - 1]?.name}`} path="/" />
			<div className="shop-box-inner">
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
							<div className="product-categori">
								<div className="search-product">
									<input
										className="form-control"
										placeholder="Tìm kiếm"
										type="text"
										ref={inputSearch}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												setSearchStr(inputSearch.current.value);
											}
										}}
									/>
									<button onClick={() => setSearchStr(inputSearch.current.value)}>
										<i className="fa fa-search"></i>
									</button>
								</div>
								<div className="filter-sidebar-left">
									<div className="title-left">
										<h3>Danh mục</h3>
									</div>
									<div
										className="list-group list-group-collapse list-group-sm list-group-tree"
										id="list-group-men"
										data-children=".sub-men"
									>
										{categories.map((category, index) => (
											<div className="list-group-collapse sub-men" key={index}>
												<button
													className={`list-group-item list-group-item-action ${
														currentCategoryId === category.id || id === category.id ? "active" : ""
													}`}
													// href='/category-detail'
													onClick={() => setCurrentCategoryId(category.id)}
												>
													{category.name}{" "}
													<small className="text-muted">
														({category.products.filter((p) => p.quantity > 0 && !p.isDeleted).length})
													</small>
												</button>
											</div>
										))}
									</div>
								</div>
								<div className="filter-price-left">
									<div className="title-left">
										<h3>Khoảng giá</h3>
									</div>
									<div className="price-box-slider">
										<div id="slider-range" className={classes.root}>
											<Slider
												value={value}
												onChange={handleChange}
												valueLabelDisplay="auto"
												aria-labelledby="slider-range"
												max={1000}
												min={1}
											/>
										</div>
										<p>
											<input
												type="text"
												id="amount"
												readOnly
												value={`$${value[0]} - $${value[1]}`}
												style={{
													border: 0,
													color: "#fbb714",
													fontWeight: "bold",
												}}
											/>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
							<div className="right-product-box">
								<div className="product-item-filter row">
									<div className="col-12 col-sm-8 text-center text-sm-left">
										<div className="toolbar-sorter-right d-flex">
											<span>Sắp xếp theo </span>
											<select
												id="basic"
												className="selectpicker show-tick form-control"
												data-placeholder="$ USD"
												value={sortValue}
												onChange={(e) => {
													setSortValue(e.target.value);
													console.log(sortValue);
												}}
											>
												<option data-display="Select" value="0">
													Nothing
												</option>
												<option value="1">Mới nhất</option>
												<option value="2">Bán chạy</option>
												<option value="3">Giá cao → Giá thấp</option>
												<option value="4">Giá thấp → Giá cao</option>
											</select>
										</div>
										{/* <p>Showing all 4 results</p> */}
									</div>
									<div className="col-12 col-sm-4 text-center text-sm-right">
										<ul className="nav nav-tabs ml-auto">
											<li>
												<a className="nav-link active" href="#grid-view" data-toggle="tab">
													{" "}
													<i className="fa fa-th"></i>{" "}
												</a>
											</li>
											{/* <li>
												<a
													className="nav-link"
													href="#list-view"
													data-toggle="tab"
												>
													{" "}
													<i className="fa fa-list-ul"></i>{" "}
												</a>
											</li> */}
										</ul>
									</div>
								</div>

								<div className="row product-categorie-box">
									<div className="tab-content">
										<div role="tabpanel" className="tab-pane fade show active" id="grid-view">
											<div className="row">
												{products.length > 0 ? (
													products.map((product, index) => (
														<div className="col-sm-6 col-md-6 col-lg-4 col-xl-4" key={index}>
															<Product
																id={product.id}
																name={product.name}
																price={product.price}
																image={product.images.filter((i) => !i.isDeleted)[0]?.path}
																quantity={product.quantity}
																cartId={cartId}
																isAuthenticated={isAuthenticated}
																fetchCart={fetchCart}
															/>
														</div>
													))
												) : (
													<div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">Chưa có sản phẩm nào</div>
												)}
												{products.length > 0 && (
													<div className="col-12">
														<CPagination {...pagination} handlePageChange={handlePageChange} />
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryDetailContent;
