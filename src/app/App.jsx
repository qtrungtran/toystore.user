import React, { Suspense, useEffect } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Helmet } from "react-helmet";
import nProgress from "nprogress";
import AppRouter from "./routing/AppRouter";
import { SnackbarProvider } from "notistack";

const RouteFallback = () => {
	useEffect(() => {
		nProgress.start();
		return () => {
			nProgress.done();
			nProgress.remove();
		};
	}, []);
	return null;
};

function App() {
	return (
		<div className="App">
			<div>
				<MessengerCustomerChat pageId="101604918772306" appId="207043767677316" />
			</div>
			{/* <div
				class="zalo-chat-widget"
				data-oaid="1936573808915194711"
				data-welcome-message="Rất vui khi được hỗ trợ bạn!"
				data-autopopup="0"
				data-width="350"
				data-height="420"
			></div>
			<Helmet>
				<script src="https://sp.zalo.me/plugins/sdk.js"></script>
			</Helmet> */}
			<Suspense fallback={<RouteFallback />}>
				<SnackbarProvider>
					<AppRouter />
				</SnackbarProvider>
			</Suspense>
		</div>
	);
}

export default App;
