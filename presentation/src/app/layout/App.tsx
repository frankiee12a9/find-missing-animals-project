import {
  Container,
  createTheme,
  CssBaseline,
  Palette,
  ThemeProvider,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import './styles/App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

import HomePage from '../components/HomePage';
import MapLandingPage from '../components/MapLandingPage';
import Loading from './Loading';
import PostDetails from '../../features/post/PostDetails';
import TagDetails from '../../features/tags/TagDetails';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import Leftbar from './Leftbar';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import { fetchCurrentUser, setUser } from '../../features/auth/authSlice';
import Profile from './../../features/auth/Profile';
import PostForm from './../../features/post/PostForm';
import FollowingPosts from './../../features/post/FollowingPosts';
import Posts from 'features/post/Posts';
import PrivateRoute from 'app/components/PrivateRoute';
import ViewedPostsHistory from 'features/post/ViewedPostsHistory';
import PostFormEdit from 'features/post/PostFormEdit';
import { PostComment } from 'app/models/comment';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [notifications, setNotifications] = useState<PostComment[]>([]);
  const hubConnection = useRef<HubConnection | null>(null);

  useEffect(() => {
    if (user?.token) {
      // connection initialization
      hubConnection.current = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_CHAT_URL + '?userToken=' + user.token, {
          accessTokenFactory: () => user.token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      // start listening to connection
      hubConnection.current
        ?.start()
        .then(() => console.log('hub connection started...'))
        .catch((err: any) =>
          console.error('Error establishing hubConnection', err)
        );

      // load all comments(in current post) from server (1)
      hubConnection.current?.on(
        'LoadNotifications',
        (notifications: PostComment[]) => {
          notifications.forEach((aComment: PostComment) => {
            aComment.timestamp = new Date(aComment.timestamp);
          });

          console.log('Loading notifications');
          setNotifications(notifications.reverse());
        }
      );

      // receive loaded comments
      hubConnection.current?.on(
        'ReceiveNotification',
        (aNotification: PostComment) => {
          toast.info('new notification received');
          // comment.timestamp = new Date(comment.timestamp);
          setNotifications((currNotifications) => [
            aNotification,
            ...currNotifications,
          ]);
        }
      );
    }

    if (!user?.token) {
      // unmount the hubConnection
      return () => {
        hubConnection.current
          ?.stop()
          .then(() => console.log('stop hubConnection'))
          .catch((err: any) =>
            console.error('Error stopping connection: ', err)
          );

        // temporarily clear all currently connected comments
        setNotifications([]);
      };
    }
  }, [user?.token]);

  // app's darkMode config
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('light');
  const paletteType = mode === 'light' ? 'light' : 'dark';
  const darkTheme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  const initializeApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      return new Promise((resolve) => resolve(true));
    } catch (err: any) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    initializeApp().then(() => setLoading(false));
  }, [initializeApp]);

  const location = useLocation();
  if (loading) return <Loading message="Loading Data..." />;

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        <Navbar />
        <Leftbar themeMode={mode} setThemeMode={setMode} />
        <Route exact path="/" component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <Container sx={{ mt: 4 }} fixed>
              <Switch>
                <Route exact path="/map" component={MapLandingPage} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/:id" component={PostDetails} />
                <Route exact path="/tags/:tagName" component={TagDetails} />
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/new']}
                  component={PostForm}
                />
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/posts/:id/edit']}
                  component={PostFormEdit}
                />
                {/* , 'posts/:id/edit' */}
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/following']}
                  component={FollowingPosts}
                />
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/viewedList']}
                  component={ViewedPostsHistory}
                />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/server-error" component={ServerError} />
                {/* <Route component={ServerError} /> */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          )}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
