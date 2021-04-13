import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Avatar,
	Typography,
	makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import formatDate from 'utils/formatDate';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
		overflow: 'auto',
		maxHeight: 300
	},
	listSection: {
		backgroundColor: 'inherit',
		borderBottom: '1px solid #dddddd'
	},
	ul: {
		backgroundColor: 'inherit',
		padding: 0,
		paddingTop: 15
	},
	main: {
		display: 'flex',
		alignItems: 'center',
		'& p': {
			marginLeft: 20
		}
	},
	item: {
		alignItems: 'flex-start'
	},
	content: {
		paddingRight: 20,
		paddingLeft: 20
	}
}));

export default function ReviewList({ reviews }) {
	const classes = useStyles();

	return (
		<List className={classes.root} subheader={<li />}>
			{reviews.map((review, sectionId) => (
				<li key={`section-${sectionId}`} className={classes.listSection}>
					<ul className={classes.ul}>
						<ListSubheader className={classes.main}>
							<Avatar alt='' src={review.user.avatar} />
							<Typography>{review.user.username}</Typography>
						</ListSubheader>
						<ListItem className={classes.item}>
							<Rating name='read-only' value={review.star} readOnly />
							<ListItemText
								primary={review.content}
								className={classes.content}
							/>
							<Typography>{formatDate(review.createdAt)}</Typography>
						</ListItem>
					</ul>
				</li>
			))}
		</List>
	);
}
