import React from "react";
// import { InputNumber } from 'antd';
// import { get } from 'lodash';

const NumberInput = ({ field = {}, form = {}, ...props }) => {
	// const { errors, touched } = form;
	// const fieldTouched = get(touched, field.name);
	// const errorMessage = get(errors, field.name);
	// console.log(field);
	return (
		<input
			// className='form-control'
			// value='0'
			// min='1'
			type="number"
			{...field}
			{...props}
		/>
	);
};

export default NumberInput;
