import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { bool } from "prop-types";
import { Menu, MenuItem, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logo from "assets/images/logo1.png";
import { localAuthenticate } from "utils/localAuth";
import { useDispatch, useSelector } from "react-redux";
import { getByUser } from "features/cartSlice";
import { getProfile } from "features/userSlice";
import calTotal from "utils/calTotal";
import { useSearch } from "app/context/SearchContext";

const Header = () => {
	const [accountMenuOpen, setAccountMenu] = useState(false);
	const toggleAccountMenu = e => {
		e.stopPropagation();
		setAccountMenu(pre => !pre);
	};
	const handleCloseAccountMenu = () => {
		setAccountMenu(false);
	};
	const { cart } = useSelector(state => state.cart);
	const { user } = useSelector(state => state.user);
	const pathname = useLocation().pathname;
	const [openCart, setOpenCart] = useState(false);
	const history = useHistory();
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	// const [cart, setCart] = useState({
	// 	user: { username: '' },
	// 	cartDetails: []
	// });
	const dispatch = useDispatch();
	const inputSearch = useRef(null);
	const { search, searchChange } = useSearch();

	useEffect(() => {
		// fetchCart();
		if (isAuthenticated) {
			dispatch(getByUser());
			dispatch(getProfile());
		}
	}, [dispatch, isAuthenticated]);

	// const fetchCart = async () => {
	// 	try {
	// 		const response = await cartAPI.getByUser();
	// 		const fetchedCart = response.data.cart;
	// 		setCart({
	// 			username: fetchedCart.user.username,
	// 			cartDetails: fetchedCart.cartDetails
	// 		});
	// 	} catch (error) {
	// 		console.log('Failed to fetch cart: ', error);
	// 	}
	// };

	useEffect(() => {
		if (accountMenuOpen) {
			window.addEventListener("click", handleCloseAccountMenu);
			return () => window.removeEventListener("click", handleCloseAccountMenu);
		}
	}, [accountMenuOpen]);

	console.log("1", cart.cartDetails);

	return (
		<div>
			<div className="main-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							{/* <div className="custom-select-box">
                        <select id="basic" className="selectpicker show-tick form-control" data-placeholder="$ USD">
						<option>¥ JPY</option>
						<option>$ USD</option>
						<option>€ EUR</option>
					</select>
                    </div> */}
							<div className="our-link">
								<ul>
									{isAuthenticated ? (
										<>
											<li className="username">{user.username}</li>
											<li className="avatar" style={{ borderRight: "none" }}>
												<NavLink to="/profile">
													<img src={user.avatar} alt="" />
												</NavLink>
											</li>
											<li className="account-menu">
												<button onClick={toggleAccountMenu}>
													<MoreVertIcon />
												</button>
												{accountMenuOpen && (
													<ul>
														<li>
															<NavLink to="/profile">Hồ sơ</NavLink>
														</li>
														<li>
															<NavLink to="/my-product">
																Sản phẩm của tôi
															</NavLink>
														</li>
														<li>
															<NavLink to="/my-order">Đơn mua</NavLink>
														</li>
														<li>
															<NavLink to="/order">Đơn bán</NavLink>
														</li>
														<li>
															<NavLink to="/logout">Đăng xuất</NavLink>
														</li>
													</ul>
												)}
											</li>
										</>
									) : (
										<>
											<li>
												<button
													onClick={() => {
														history.push("/login");
													}}
													className="btn"
												>
													Đăng nhập
												</button>
											</li>
											<li>
												<button
													onClick={() => {
														history.push("/register");
													}}
													className="btn"
												>
													Đăng ký
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<header className="main-header">
				<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
					<div className="container">
						<div className="navbar-header">
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbar-menu"
								aria-controls="navbars-rs-food"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<i className="fa fa-bars"></i>
							</button>
							{/* <a className='navbar-brand' href='index.html'>
								<img src={logo} className='logo' alt='' />
							</a> */}
							<NavLink to="/">
								<img
									src={logo}
									className="logo"
									alt=""
									style={{ height: 81 }}
								/>
							</NavLink>
						</div>

						<div className="top-search">
							<div className="container">
								<div className="input-group">
									<span className="input-group-addon">
										<i className="fa fa-search"></i>
									</span>
									<input
										type="text"
										className="form-control"
										placeholder="Tìm kiếm"
										ref={inputSearch}
										onKeyPress={e => {
											if (e.key === "Enter") {
												searchChange(inputSearch.current.value);
											}
										}}
									/>
									<button
										onClick={() => searchChange(inputSearch.current.value)}
									>
										<i className="fa fa-search"></i>
									</button>
								</div>
							</div>
						</div>

						<div className="attr-nav">
							<ul>
								{isAuthenticated && (
									<li className="side-menu">
										<button onClick={() => setOpenCart(true)}>
											<i className="fa fa-shopping-bag"></i>
											<span className="badge">{cart.cartDetails?.length}</span>
										</button>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className={`side ${openCart && "on"}`}>
						<button className="close-side" onClick={() => setOpenCart(false)}>
							<i className="fa fa-times"></i>
						</button>
						<li className="cart-box">
							<ul className="cart-list">
								{cart.cartDetails?.map((detail, index) => (
									<li key={index}>
										<a href="/" className="photo">
											<img
												src={detail.product.images[0]?.path}
												className="cart-thumb"
												alt=""
											/>
										</a>
										<h6>
											<a href="/">{detail.product.name}</a>
										</h6>
										<p>
											{detail.quantity}x -{" "}
											<span className="price">${detail.price}</span>
										</p>
									</li>
								))}
								<li className="total">
									<buton
										className="btn btn-default hvr-hover btn-cart"
										onClick={() => history.push("/cart")}
									>
										Xem giỏ hàng
									</buton>
									<span className="float-right">
										<strong>Tổng</strong>: ${calTotal(cart.cartDetails)}
									</span>
								</li>
							</ul>
						</li>
					</div>
				</nav>
			</header>
		</div>
	);
};

Header.propTypes = {
	isAuthenticated: bool
};
export default Header;
