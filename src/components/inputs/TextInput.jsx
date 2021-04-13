import React from 'react';
import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import './input.scss';

const TextInput = ({ field = {}, form = {}, ...props }) => {
	// const { errors, touched } = form;
	// const fieldTouched = get(touched, field.name);
	// const errorMessage = get(errors, field.name);
	// console.log(field);
	// return <input {...field} {...props} />;

	const { errors, touched } = form;
	const fieldTouched = get(touched, field.name);
	const errorMessage = get(errors, field.name);
	// console.log(field);
	return (
		<TextField
			error={Boolean(fieldTouched && errorMessage)}
			{...field}
			{...props}
			helperText={fieldTouched && errorMessage}
		/>
	);
};

export default TextInput;
