import React from "react";

const Footer = () => {
	return (
		<div>
			<footer>
				<div className="footer-main">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-12 col-sm-12">
								<div className="footer-widget">
									<h4>The Toy Store</h4>
									<p>
										Giữa những bộn bề cuộc sống thường nhật, nếu bên cạnh chúng ta có những người bạn là những vật dụng
										thường ngày mang hình dáng đáng yêu, thì khi sử dụng sản phẩm mỗi chúng ta sẽ được trẻ hơn trong tâm
										hồn, vui vẻ trong mọi khoảng khắc.
									</p>
									<ul>
										<li>
											<a href="/">
												<i className="fab fa-facebook" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fab fa-twitter" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fab fa-linkedin" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fab fa-google-plus" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fa fa-rss" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fab fa-pinterest-p" aria-hidden="true"></i>
											</a>
										</li>
										<li>
											<a href="/">
												<i className="fab fa-whatsapp" aria-hidden="true"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4 col-md-12 col-sm-12">
								<div className="footer-link">
									<h4>Thông tin</h4>
									<ul>
										<li>
											<a href="/">Về chúng tôi</a>
										</li>
										<li>
											<a href="/">Dịch vụ khách hàng</a>
										</li>
										<li>
											<a href="/">Điều khoản &amp; Điều kiện</a>
										</li>
										<li>
											<a href="/">Chính sách bảo mật</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4 col-md-12 col-sm-12">
								<div className="footer-link-contact">
									<h4>Liên hệ</h4>
									<ul>
										<li>
											<p>
												<i className="fas fa-map-marker-alt"></i>Địa chỉ: 123a Nguyễn Chí Thanh,
												<br />
												Quận Hải Châu,
												<br />
												Thành phố Đà Nẵng
											</p>
										</li>
										<li>
											<p>
												<i className="fas fa-phone-square"></i>Điện thoại: <a href="tel:090.247.1988">090.247.1988</a>
											</p>
										</li>
										<li>
											<p>
												<i className="fas fa-envelope"></i>Email:{" "}
												<a href="mailto:contactinfo@gmail.com">contactinfo@gmail.com</a>
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<div className="footer-copyright">
				<p className="footer-company">
					<a href="/">The Toy Store</a>
				</p>
			</div>

			<a href="/" id="back-to-top" title="Back to top" style={{ display: "none" }}>
				&uarr;
			</a>
		</div>
	);
};

export default Footer;
