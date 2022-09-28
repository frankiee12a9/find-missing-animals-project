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
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './../store/storeConfig';

interface Props {
  themeMode: string;
  setThemeMode: (mode: string) => void;
}

export default function Leftbar({ themeMode, setThemeMode }: Props) {
  const dispatch = useAppDispatch();
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/posts">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          {user && (
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/following">
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Following Posts" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/map">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Search on map" />
            </ListItemButton>
          </ListItem>
          {user && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  onClick={() => dispatch(logout())}
                >
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/new">
                  <ListItemIcon>
                    <CreateOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Create new post" />
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
                  setThemeMode(themeMode === 'light' ? 'dark' : 'light')
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
