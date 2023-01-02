import { Send } from '@mui/icons-material';
import {
	Divider,
	Fab,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
} from '@mui/material';
import { UserProfileDto } from 'app/models/user';
import { Link, NavLink } from 'react-router-dom';

interface Props {
	user: UserProfileDto;
}

export default function ChatMessage({ user }: Props) {
	return (
		<Grid item xs={9}>
			<List style={{ height: '70vh', overflowY: 'auto' }}>
				<ListItemButton
					component={NavLink}
					to={`/privateChat/${user.username}`}
				>
					<Grid container>
						<Grid item xs={12}>
							<ListItemText
								// align="right"
								style={{ alignItems: 'right' }}
								primary={`Hey man, What's up ? ${user.displayName}`}
							></ListItemText>
						</Grid>
						<Grid item xs={12}>
							<ListItemText
								style={{ alignItems: 'right' }}
								// align="right"
								secondary="09:30"
							></ListItemText>
						</Grid>
					</Grid>
				</ListItemButton>
			</List>
			<Divider />
			<Grid container style={{ padding: '20px' }}>
				<Grid item xs={11}>
					<TextField
						id="outlined-basic-email"
						label="Type Something"
						fullWidth
					/>
				</Grid>
				<Grid xs={1} alignItems="flex-start">
					<Fab color="primary" aria-label="add">
						<Send />
					</Fab>
				</Grid>
			</Grid>
		</Grid>
	);
}
