import { Container, makeStyles, Typography } from '@material-ui/core';
// import {
//   Bookmark,
//   List,
//   ExitToApp,
//   Map,
//   Home,
//   Person,
//   PhotoCamera,
//   PlayCircleOutline,
//   Settings,
//   Storefront,
//   //   ModeNight,
//   TabletMac,
//   Group,
//   AccountBox,
// } from '@material-ui/icons';
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

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    color: 'white',
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: 'sticky',
    top: 0,
    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'white',
      color: '#555',
      border: '1px solid #ece7e7',
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      cursor: 'pointer',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

interface Props {
  themeMode: string;
  setThemeMode: (mode: string) => void;
}

export default function Leftbar({ themeMode, setThemeMode }: Props) {
  const classes = useStyles();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Following Posts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/map">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Search on map" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
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

    // <Container className={classes.container}>
    //   <div className={classes.item}>
    //     <Home className={classes.icon} />
    //     <Typography className={classes.text}>홈</Typography>
    //   </div>
    //   <div className={classes.item}>
    //     <Person className={classes.icon} />
    //     <Typography className={classes.text}>폴로잉포스트</Typography>
    //   </div>
    //   <div className={classes.item}>
    //     <Map className={classes.icon} />
    //     <Typography component={Link} to="/map" className={classes.text}>
    //       맵으로 검색
    //     </Typography>
    //   </div>

    //   <div className={classes.item}>
    //     <ExitToApp className={classes.icon} />
    //     <Typography className={classes.text}>로그아웃</Typography>
    //   </div>
    // </Container>
  );
}
