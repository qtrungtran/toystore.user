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
									<h4>My Shopee</h4>
									<p>
										Để con em chúng ta phát triển một cách tốt nhất. My Shopee là nơi để bạn có thể mua được những đồ
										chơi phù hợp nhất cho trẻ.
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
												<i className="fas fa-map-marker-alt"></i>Địa chỉ: 54 Nguyễn Lương Bằng,
												<br />
												Quận Liên Chiểu,
												<br />
												Thành phố Đà Nẵng
											</p>
										</li>
										<li>
											<p>
												<i className="fas fa-phone-square"></i>Điện thoại: <a href="tel:098.880.156">098.880.156</a>
											</p>
										</li>
										<li>
											<p>
												<i className="fas fa-envelope"></i>Email:{" "}
												<a href="mailto:toystore@gmail.com">toystore@gmail.com</a>
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
					<a href="/">My Shopee</a>
				</p>
			</div>

			<a href="/" id="back-to-top" title="Back to top" style={{ display: "none" }}>
				&uarr;
			</a>
		</div>
	);
};

export default Footer;
