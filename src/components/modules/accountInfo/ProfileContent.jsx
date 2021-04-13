import React, { useState, useEffect, useCallback } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import "antd/dist/antd.css";
import { Menu } from "antd";
import Page from "components/Page";
import TitleBox from "components/titleBox";
import ProfileAvatar from "components/profileInfo/profileAvatar";
import ProfileDetails from "components/profileInfo/profileDetails";
import { localAuthenticate } from "utils/localAuth";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "features/userSlice";
import userAPI from "api/user";
import useNotification from "utils/hooks/notification";
import ChangePassword from "components/profileInfo/changePassword";
import MyWallet from "components/profileInfo/myWallet";
import Statistics from "components/profileInfo/statistics";

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: "#fff",
		minHeight: "100%",
		paddingBottom: theme.spacing(9),
		paddingTop: theme.spacing(9)
	}
}));

const ProfileContent = () => {
	const classes = useStyles();
	const { user } = useSelector(state => state.user);
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const dispatch = useDispatch();
	const { showSuccess, showError } = useNotification();
	const [selectedMenuItem, setSelectedMenuItem] = useState(1);

	const fetchUser = () => {
		dispatch(getProfile());
	};

	const onFileUpload = async image => {
		try {
			if (image !== "") {
				let fileData = new FormData();
				fileData.set("image", image, `${image.lastModified}-${image.name}`);
				await userAPI.uploadAvatar(fileData, user.id);
				await fetchUser();
				showSuccess("Tải ảnh thành công");
			}
		} catch (error) {
			showError("Tải ảnh không thành công");
		}
	};

	return (
		<>
			<TitleBox parent="Trang chủ" children="Hồ sơ" path="/" />
			<div className="profile">
				<div className="container">
					{/* <Page className={classes.root} title='Account'>
					<Container> */}
					<Grid container spacing={3}>
						<Grid item md={3} xs={3}>
							<Menu
								style={{ width: 256 }}
								defaultSelectedKeys={["1"]}
								defaultOpenKeys={["sub1"]}
								mode="inline"
								theme="light"
								onClick={value => setSelectedMenuItem(parseInt(value.key))}
							>
								<Menu.Item key="1">Thông tin cá nhân</Menu.Item>
								<Menu.Item key="2">Thiết lập mật khẩu</Menu.Item>
								<Menu.Item key="3">
									Ví của tôi{" "}
									<span style={{ float: "right" }}>${user.wallet}</span>
								</Menu.Item>
								<Menu.Item key="4">Thống kê</Menu.Item>
							</Menu>
						</Grid>
						{selectedMenuItem === 1 && (
							<>
								<Grid item md={3} xs={9}>
									<ProfileAvatar
										user={{ ...user }}
										onFileUpload={onFileUpload}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<ProfileDetails user={{ ...user }} fetchUser={fetchUser} />
								</Grid>
							</>
						)}
						{selectedMenuItem === 2 && (
							<Grid item md={9} xs={9}>
								<ChangePassword userId={user.id} />
							</Grid>
						)}
						{selectedMenuItem === 3 && (
							<Grid item md={9} xs={9}>
								<MyWallet
									wallet={user.wallet}
									transactions={user.transactions}
								/>
							</Grid>
						)}
						{selectedMenuItem === 4 && (
							<Grid item md={9} xs={9}>
								{/* <ChangePassword userId={user.id} /> */}
								<Statistics />
							</Grid>
						)}
					</Grid>
					{/* </Container>
				</Page> */}
				</div>
			</div>
		</>
	);
};

export default ProfileContent;
