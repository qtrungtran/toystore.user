import React from "react";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		width: "100%"
	},
	label: {
		background: "#fff",
		padding: "0 6px",
		fontSize: 15,
		fontFamily: "Montserrat"
	},
	item: {
		fontSize: 15,
		fontFamily: "Montserrat"
	}
}));

const SelectInput = ({ field = {}, form = {}, ...props }) => {
	const { options = [], id, label, ...restProps } = props;
	const classes = useStyles();
	return (
		<FormControl
			className={classes.formControl}
			variant="outlined"
			size="small"
		>
			<InputLabel id={id} className={classes.label}>
				{label}
			</InputLabel>
			<Select {...field} {...restProps} id={id}>
				{options.map(({ key, label }) => {
					return (
						<MenuItem value={key} key={key} className={classes.item}>
							{label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default SelectInput;
