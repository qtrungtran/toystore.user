import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Formik, Form } from 'formik';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
	makeStyles
} from '@material-ui/core';
import userAPI from 'api/user';

const useStyles = makeStyles(() => ({
	root: {},
	cardActions: {
		justifyContent: 'space-between'
	},
	input: {
		display: 'none'
	},
	avatar: {
		height: 200,
		width: 200,
		marginBottom: 8,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	button: {
		minWidth: 30,
		width: 30,
		height: 30,
		backgroundColor: '#122230',
		fontSize: 14,
		'&:hover': {
			backgroundColor: '#122230ed'
		}
	},
	group: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 'fit-content'
	}
}));

const ProfileAvatar = ({ className, user, onFileUpload, ...rest }) => {
	const classes = useStyles();
	const [image, setImage] = useState({});

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{}}
			onSubmit={() => {
				onFileUpload(image);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					{/* <Card className={clsx(classes.root, className)} {...rest}>
						<CardContent>
							<Box alignItems='center' display='flex' flexDirection='column'> */}
					<Avatar className={classes.avatar} src={user.avatar} />
					{/* <Typography color='textPrimary' gutterBottom variant='h3'>
									{user.username}
								</Typography>
							</Box>
						</CardContent>
						<Divider />
						<CardActions className={classes.cardActions}> */}
					<input
						name='image'
						className={classes.input}
						id='contained-button-file'
						type='file'
						onChange={e => {
							setImage(e.target.files[0]);
						}}
					/>
					<div className={classes.group}>
						<label htmlFor='contained-button-file' style={{ marginBottom: 0 }}>
							<Button
								variant='contained'
								color='primary'
								component='span'
								size='small'
								className={classes.button}
							>
								{/* Chọn ảnh */}
								<i class='fas fa-file-image'></i>
							</Button>
						</label>
						<Button
							color='primary'
							disabled={isSubmitting}
							size='small'
							type='submit'
							variant='contained'
							style={{ marginLeft: 10 }}
							className={classes.button}
						>
							{/* Tải lên */}
							<i class='fas fa-upload'></i>
						</Button>
					</div>
					{/* </CardActions>
					</Card> */}
				</Form>
			)}
		</Formik>
	);
};

ProfileAvatar.propTypes = {
	className: PropTypes.string
};

export default ProfileAvatar;
