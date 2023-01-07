import {
	AccountBox,
	Article,
	Map,
	Group,
	Home,
	ModeNight,
	Person,
	Settings,
	Storefront,
	CreateOutlined,
	Message,
} from '@mui/icons-material';
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
} from '@mui/material';
import { LEFT_NAV_NAME } from 'app/utils/utils';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './../store/storeConfig';

interface Props {
	themeMode: string;
	setThemeMode: (mode: string) => void;
}

export default function Leftbar({ themeMode, setThemeMode }: Props) {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	return (
		<Box
			flex={1}
			p={2}
			sx={{
				display: {
					xs: 'none',
					sm: 'block',
					fontSmooth: 'flex',
					fontFamily: 'fantasy',
				},
			}}
		>
			<Box position="fixed">
				<List>
					<ListItem disablePadding>
						<ListItemButton component={NavLink} to="/posts">
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							{/* <ListItemText primary="Homepage" /> */}
							<ListItemText primary={LEFT_NAV_NAME.homePage} />
						</ListItemButton>
					</ListItem>
					{user && (
						<ListItem disablePadding>
							<ListItemButton component={NavLink} to="/following">
								<ListItemIcon>
									<Group />
								</ListItemIcon>
								{/* <ListItemText primary="Following Posts" /> */}
								<ListItemText
									primary={LEFT_NAV_NAME.followingPost}
								/>
							</ListItemButton>
						</ListItem>
					)}
					<ListItem disablePadding>
						<ListItemButton component={NavLink} to="/map">
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>
							{/* <ListItemText primary="Search on map" /> */}
							<ListItemText primary={LEFT_NAV_NAME.mapSearch} />
						</ListItemButton>
					</ListItem>
					{user && (
						<>
							<ListItem disablePadding>
								<ListItemButton
									component={NavLink}
									to="/privateChat"
								>
									<ListItemIcon>
										<Message />
									</ListItemIcon>
									{/* <ListItemText primary="Logout" /> */}
									<ListItemText
										primary={LEFT_NAV_NAME.privateChat}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton
									component="a"
									onClick={() => dispatch(logout())}
								>
									<ListItemIcon>
										<AccountBox />
									</ListItemIcon>
									{/* <ListItemText primary="Logout" /> */}
									<ListItemText
										primary={LEFT_NAV_NAME.logout}
									/>
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton component={NavLink} to="/new">
									<ListItemIcon>
										<CreateOutlined />
									</ListItemIcon>
									{/* <ListItemText primary="Create new post" /> */}
									<ListItemText
										primary={LEFT_NAV_NAME.newPost}
									/>
								</ListItemButton>
							</ListItem>
						</>
					)}
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<ModeNight />
							</ListItemIcon>
							<Switch
								onChange={(e) =>
									setThemeMode(
										themeMode === 'light' ? 'dark' : 'light'
									)
								}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
}
