import React from 'react';
import banner1 from 'assets/images/banner-01.jpg';
import banner2 from 'assets/images/banner-02.jpg';
import banner3 from 'assets/images/banner-03.jpg';
import './banner.scss';

const Banner = () => {
	return (
		<div id="slides-shop" className="cover-slides">
        <ul className="slides-container">
            <li className="text-left">
                <img src={banner1} alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br /> trends to see any changes in performance over time.</p>
                            <p><a className="btn hvr-hover" href="/">Shop New</a></p>
                        </div>
                    </div>
                </div>
            </li>
            <li className="text-center">
                <img src={banner2} alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br /> trends to see any changes in performance over time.</p>
                            <p><a className="btn hvr-hover" href="/">Shop New</a></p>
                        </div>
                    </div>
                </div>
            </li>
            <li className="text-right">
                <img src={banner3} alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="m-b-20"><strong>Welcome To <br /> Thewayshop</strong></h1>
                            <p className="m-b-40">See how your users experience your website in realtime or view <br /> trends to see any changes in performance over time.</p>
                            <p><a className="btn hvr-hover" href="/">Shop New</a></p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div className="slides-navigation">
            <a href="/" className="next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
            <a href="/" className="prev"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
        </div>
    </div>
	)
}

export default Banner;