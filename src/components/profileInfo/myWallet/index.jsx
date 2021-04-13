import React from "react";
import "antd/dist/antd.css";
import { Table, Card, Space } from "antd";
import formatDate from "utils/formatDate";

const columns = [
	{
		title: "Đơn hàng",
		dataIndex: "order",
		key: "order"
	},
	{
		title: "Số tiền giao dịch",
		dataIndex: "amount",
		key: "amount",
		render: text => <span>${text}</span>
	},
	{
		title: "Ngày giao dịch",
		dataIndex: "date",
		key: "date"
	},
	{
		title: "Trạng thái",
		key: "status",
		dataIndex: "status"
	}
];

const MyWallet = ({ wallet, transactions = [] }) => {
	const data = transactions.map((transaction, index) => {
		return {
			key: index + 1,
			order: transaction.orderId,
			amount: transaction.amount,
			date: formatDate(transaction.createdAt),
			status: transaction.status
		};
	});
	return (
		<>
			<Space size={16} direction="vertical" style={{ width: "100%" }}>
				<Card
					style={{
						width: "fit-content",
						color: "#d33b33",
						fontSize: 24,
						fontWeight: "bold"
					}}
				>
					<span>${wallet}</span>
				</Card>
				<Table columns={columns} dataSource={data} pagination={false} />
			</Space>
		</>
	);
};

export default MyWallet;
