import React, { useState } from "react";
import "antd/dist/antd.css";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadProduct = ({
	uploadData,
	handleCancel,
	handleChange,
	handlePreview,
	beforeUpload,
	handleRemove
}) => {
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Tải lên</div>
		</div>
	);
	return (
		<>
			<Upload
				listType="picture-card"
				fileList={uploadData.fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				multiple
				beforeUpload={beforeUpload}
				onRemove={handleRemove}
			>
				{uploadData.fileList.length >= 8 ? null : uploadButton}
			</Upload>
			<Modal
				visible={uploadData.previewVisible}
				title={uploadData.previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="example"
					style={{ width: "100%" }}
					src={uploadData.previewImage}
				/>
			</Modal>
		</>
	);
};

export default UploadProduct;
