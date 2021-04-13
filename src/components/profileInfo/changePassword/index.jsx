import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	makeStyles
} from '@material-ui/core';
import TextInput from 'components/inputs/TextInput';
import userAPI from 'api/user';
import useNotification from 'utils/hooks/notification';
import { changePassword } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import routes from 'app/routing/routes';

const useStyles = makeStyles(() => ({
	root: {},
	button: {
		backgroundColor: '#122230',
		'&:hover': {
			backgroundColor: '#122230ed'
		}
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		cursor: 'pointer',
		marginTop: 20,
		marginBottom: 10,
		fontSize: 18
	}
}));

const ChangePassword = ({ userId, ...rest }) => {
	const classes = useStyles();
	const { showSuccess, showError } = useNotification();
	const dispatch = useDispatch();

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			}}
			validationSchema={Yup.object().shape({
				oldPassword: Yup.string().max(255).required('Old Password is required'),
				newPassword: Yup.string().max(255).required('New Password is required'),
				confirmPassword: Yup.string()
					.max(255)
					.required('Confirm Password is required')
			})}
			onSubmit={(
				{ oldPassword, newPassword, confirmPassword },
				{ setSubmitting }
			) => {
				dispatch(
					changePassword({
						oldPassword,
						newPassword,
						confirmPassword,
						id: userId,
						onComplete: (error, data) => {
							setSubmitting(false);
							if (!error) {
								showSuccess('Đổi mật khẩu thành công');
								return;
							}
							const errorMessages = Object.values(error).join('. ');
							return showError(error);
						}
					})
				);
			}}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<Card>
						{/* <CardHeader title='Thiết lập mật khẩu' />
						<Divider /> */}
						<CardContent>
							<Field
								label='Mật khẩu cũ'
								type='password'
								margin='normal'
								name='oldPassword'
								component={TextInput}
								fullWidth
								variant='outlined'
								size='small'
							/>
							<Field
								label='Mật khẩu mới'
								type='password'
								margin='normal'
								name='newPassword'
								component={TextInput}
								fullWidth
								variant='outlined'
								size='small'
							/>
							<Field
								label='Xác nhận mật khẩu'
								type='password'
								margin='normal'
								name='confirmPassword'
								component={TextInput}
								fullWidth
								variant='outlined'
								size='small'
							/>
						</CardContent>
						<Divider />
						<Box display='flex' justifyContent='flex-end' p={2}>
							<Button
								color='primary'
								variant='contained'
								type='submit'
								className={classes.button}
							>
								Đổi mật khẩu
							</Button>
						</Box>
					</Card>
				</Form>
			)}
		</Formik>
	);
};

ChangePassword.propTypes = {
	className: PropTypes.string
};

export default ChangePassword;
