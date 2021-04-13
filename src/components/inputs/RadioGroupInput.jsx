import React from 'react';
import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio
} from '@material-ui/core';

const RadioGroupInput = ({ field = {}, form = {}, ...props }) => {
	const { options = [], id, label, ...restProps } = props;
	return (
		<FormControl fullWidth component='fieldset'>
			<FormLabel component='legend'>{label}</FormLabel>
			<RadioGroup aria-label={label} {...field} {...restProps}>
				{options.map(({ key, label, ...rest }) => {
					return (
						<FormControlLabel
							key={key}
							value={key}
							control={<Radio />}
							label={label}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioGroupInput;
