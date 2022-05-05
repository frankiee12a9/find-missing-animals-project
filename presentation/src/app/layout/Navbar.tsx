import React, { useState } from 'react';
// import {
//   alpha,
//   AppBar,
//   Avatar,
//   Badge,
//   InputBase,
//   makeStyles,
//   Toolbar,
//   Switch,
//   Typography,
// } from '@material-ui/core';

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  makeStyles,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { Cancel, Mail, Notifications, Search, Pets } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface DisplayProps {
  open: boolean;
}

// const useStyles = makeStyles((theme: any) => ({
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   logoLg: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   logoSm: {
//     display: 'block',
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   //   search: {
//   //     display: 'flex',
//   //     alignItems: 'center',
//   //     backgroundColor: alpha(theme.palette.common.white, 0.15),
//   //     '&:hover': {
//   //       backgroundColor: alpha(theme.palette.common.white, 0.25),
//   //     },
//   //     borderRadius: theme.shape.borderRadius,
//   //     width: '50%',
//   //     [theme.breakpoints.down('sm')]: {
//   //       display: (props: DisplayProps) => (props.open ? 'flex' : 'none'),
//   //       width: '70%',
//   //     },
//   //   },
//   input: {
//     color: 'white',
//     marginLeft: theme.spacing(1),
//   },
//   cancel: {
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   searchButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   icons: {
//     alignItems: 'center',
//     display: (props: DisplayProps) => (props.open ? 'none' : 'flex'),
//   },
//   badge: {
//     marginRight: theme.spacing(2),
//   },
// }));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

// // const Search = styled('div')(({ theme }) => ({
// //   backgroundColor: 'white',
// //   padding: '0 10px',
// //   borderRadius: theme.shape.borderRadius,
// //   width: '40%',
// // }));

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

// const UserBox = makeStyles((theme: any) => ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   [theme.breakpoints.up('sm')]: {
//     display: 'none',
//   },
// }));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  //   const classes = useStyles({ open });

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Where are my Missing Pets you?
        </Typography>
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e: any) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="caption">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
