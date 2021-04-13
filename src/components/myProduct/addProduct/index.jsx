import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
	Box,
	Button,
	Container,
	Link,
	Typography,
	makeStyles
} from "@material-ui/core";
import Page from "components/Page";
import TextInput from "components/inputs/TextInput";
import SelectInput from "components/inputs/SelectInput";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import UploadProduct from "components/uploadProduct";
import productAPI from "api/product";
import categoryAPI from "api/category";
import imageAPI from "api/image";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "#fff",
		height: "100%"
		// paddingBottom: theme.spacing(3),
		// paddingTop: theme.spacing(3)
	},
	container: {
		paddingLeft: 0,
		paddingRight: 0
	},
	title: {
		fontFamily: "Montserrat",
		fontSize: 15,
		fontWeight: 400,
		color: "#666666",
		padding: 0
	},
	field: {
		"& label, & input, & textarea, & > div": {
			fontSize: 15,
			fontFamily: "Montserrat"
		}
	},
	button: {
		backgroundColor: "#122230",
		"&:hover": {
			backgroundColor: "#122230ed"
		}
	}
}));

const getBase64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
};

const AddProduct = ({ fetchProduct }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { showError, showSuccess } = useNotification();
	const history = useHistory();
	const [categories, setCategories] = useState([]);
	const [images, setImages] = useState(null);

	// upload
	const [uploadData, setData] = useState({
		previewVisible: false,
		previewImage: "",
		previewTitle: "",
		fileList: []
	});

	const handleCancel = () => setData({ ...uploadData, previewVisible: false });

	const handleRemove = e => {
		// console.log("remove", e);
		const currentImages = images;
		setImages(currentImages.filter(i => i.uid !== e.uid));
	};

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setData({
			...uploadData,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle:
				file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		});
	};

	const handleChange = ({ fileList }) => {
		console.log("list: ", fileList);
		setData({ ...uploadData, fileList });
		// setImages(fileList);
	};

	const beforeUpload = (file, fileList) => {
		setImages(fileList);
		// Prevent upload
		return false;
	};

	// end upload

	const onFileUpload = async id => {
		try {
			if (images) {
				for (let i = 0; i < images.length; i++) {
					if (images[i] !== "") {
						let fileData = new FormData();
						fileData.set(
							"image",
							images[i],
							`${images[i].lastModified}-${images[i].name}`
						);
						await imageAPI.uploadProductImage(fileData, id);
					}
				}
			} else {
				await imageAPI.setDefaultImage(id);
			}
		} catch (error) {
			console.log("Failed to edit user: ", error);
		}
	};

	console.log({ images });

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryAPI.getAll();
				setCategories(response.data.categories);
			} catch (error) {
				console.log("Failed to fetch category: ", error);
			}
		};
		fetchCategories();
	}, []);

	return (
		<Page className={classes.root} title="Add product">
			<Box
				display="flex"
				flexDirection="column"
				// height="100%"
				justifyContent="center"
			>
				<Container maxWidth="sm" className={classes.container}>
					<Formik
						enableReinitialize={true}
						initialValues={{
							categoryId: "",
							name: "",
							description: "",
							quantity: "",
							price: ""
						}}
						validationSchema={Yup.object().shape({
							categoryId: Yup.number().required("Danh mục là bắt buộc"),
							name: Yup.string().required("Tên là bắt buộc"),
							quantity: Yup.number().required("Số lượng là bắt buộc"),
							price: Yup.number().required("Giá là bắt buộc")
						})}
						onSubmit={async (
							{ categoryId, name, description, quantity, price },
							{ setSubmitting }
						) => {
							try {
								const response = await productAPI.add({
									categoryId,
									name,
									description,
									quantity,
									price
								});
								await onFileUpload(response.data.id);
								await fetchProduct();
								showSuccess("Thêm sản phẩm thành công");
								// history.push(routes.products.path);
							} catch (error) {
								console.log("Failed to add product: ", error);
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<Box>
									<Typography
										color="textPrimary"
										variant="h6"
										className={classes.title}
									>
										Thêm sản phẩm
									</Typography>
								</Box>
								<Field
									label="Tên"
									margin="normal"
									name="name"
									component={TextInput}
									fullWidth
									variant="outlined"
									className={classes.field}
									size="small"
								/>
								<Field
									name="categoryId"
									options={categories.map(category => {
										return {
											key: category.id,
											label: category.name
										};
									})}
									component={SelectInput}
									fullWidth
									label="Danh mục"
									className={classes.field}
									// variant="outlined"
								/>
								<Field
									label="Số lượng"
									margin="normal"
									name="quantity"
									component={TextInput}
									fullWidth
									type="number"
									variant="outlined"
									className={classes.field}
									size="small"
								/>
								<Field
									label="Giá"
									margin="normal"
									name="price"
									component={TextInput}
									fullWidth
									type="number"
									variant="outlined"
									className={classes.field}
									size="small"
								/>
								<Field
									label="Mô tả"
									margin="normal"
									name="description"
									component={TextInput}
									fullWidth
									multiline
									rows={5}
									variant="outlined"
									className={classes.field}
								/>
								<UploadProduct
									uploadData={{ ...uploadData }}
									handleCancel={handleCancel}
									handleChange={handleChange}
									handlePreview={handlePreview}
									beforeUpload={beforeUpload}
									handleRemove={handleRemove}
								/>
								<Box my={2}>
									<Button
										color="primary"
										disabled={isSubmitting}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
										className={classes.button}
									>
										Thêm
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</Container>
			</Box>
		</Page>
	);
};

export default AddProduct;
