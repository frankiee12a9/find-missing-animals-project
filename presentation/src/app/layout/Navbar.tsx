import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  debounce,
  InputBase,
  List,
  ListItem,
  makeStyles,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Cancel, Mail, Notifications, Pets } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setPostParams } from '../../features/post/postSlice';
import { logout } from '../../features/auth/authSlice';
import path from 'path';
import { title } from 'process';
import { history } from '../..';
import HomePage from 'app/components/HomePage';

interface DisplayProps {
  open: boolean;
}

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'white.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { postQueryParams } = useAppSelector((state) => state.posts);
  const [searchText, setSearchText] = useState(postQueryParams?.searchText);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setPostParams({ searchText: event.target.value }));
  });

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          to="/"
          component={NavLink}
        >
          My Missing Pets, Where?
        </Typography>
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Search>
          <InputBase
            fullWidth
            value={searchText || ''}
            placeholder="search..."
            onChange={(event: any) => {
              setSearchText(event.target.value);
              debouncedSearch(event);
            }}
          />
        </Search>
        <Icons>
          {user ? (
            <>
              <Badge badgeContent={4} color="error">
                <Mail />
              </Badge>
              <Badge badgeContent={2} color="error">
                <Notifications />
              </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={user?.image}
                onClick={(e) => setOpen(true)}
              />
            </>
          ) : (
            <>
              <List sx={{ display: 'flex' }}>
                <ListItem component={Link} to="/login" sx={navStyles}>
                  {'Login'.toUpperCase()}
                </ListItem>
                <ListItem component={Link} to="/register" sx={navStyles}>
                  {'Register'.toUpperCase()}
                </ListItem>
              </List>
            </>
          )}
        </Icons>
        {/* <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="h6">John</Typography>
        </UserBox> */}
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        style={{ top: '30px' }}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem component={Link} to={`/profile/${user?.username}`}>
          Profile
        </MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            window.location.reload();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
