import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import TitleBox from "components/titleBox";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import orderAPI from "api/order";
import useNotification from "utils/hooks/notification";

const Paypal = () => {
	const history = useHistory();

	const location = useLocation();
	const { orderIds, total } = location.state;
	// const { search } = useLocation();
	// const { id, total } = qs.parse(search.replace(/^\?/, ""));
	const { showSuccess } = useNotification();
	console.log(orderIds, total);
	const updateOrderStatus = async () => {
		try {
			for (const orderId of orderIds) {
				await orderAPI.editStatus({ statusId: 1 }, orderId);
			}
			history.push("/cart");
			showSuccess("Thanh toán thành công");
		} catch (error) {
			console.log("Failed to update status: ", error);
		}
	};

	return (
		<>
			<TitleBox parent="Trang chủ" children="Thanh toán" path="/" />
			<div className="paypal">
				<PayPalButton
					amount={total}
					// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
					onSuccess={(details, data) => {
						// alert('Transaction completed by ' + details.payer.name.given_name);

						// // OPTIONAL: Call your server to save the transaction
						// return fetch('/paypal-transaction-complete', {
						// 	method: 'post',
						// 	body: JSON.stringify({
						// 		orderId: data.orderID
						// 	})
						// });
						updateOrderStatus();
						console.log(details, data);
					}}
					currency="USD"
					options={{
						clientId:
							"AahRbFwBxZbe_2LApCXd-8j3eyIuwbBEqM0qU6Jdmey7HPU_RHxCkCl_1MDZCxQVZAJgJPr9rsmseJs7"
					}}
				/>
			</div>
		</>
	);
};

export default Paypal;
