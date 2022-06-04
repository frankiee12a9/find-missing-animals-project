import {
  Container,
  createTheme,
  CssBaseline,
  Palette,
  ThemeProvider,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import './styles/App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../components/HomePage';
import MapLandingPage from '../components/MapLandingPage';
import Loading from './Loading';
import PostDetails from '../../features/post/PostDetails';
import TagDetails from '../../features/tags/TagDetails';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import PostUpsert from '../../features/post/PostUpsert';
import Leftbar from './Leftbar';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import { fetchCurrentUser, setUser } from '../../features/auth/authSlice';
import Profile from './../../features/auth/Profile';
import PostForm from './../../features/post/PostForm';
import FollowingPosts from './../../features/post/FollowingPosts';
import Posts from 'features/post/Posts';
import PrivateRoute from 'app/components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // app's darkMode config
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
  if (loading) return <Loading message="Initializing App..." />;

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
                <Route path="/posts/:id" component={PostDetails} />
                <Route exact path="/tags/:tagName" component={TagDetails} />
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/new', 'posts/:id/update']}
                  component={PostForm}
                />
                <PrivateRoute
                  // exact
                  key={location.key}
                  path={['/following']}
                  component={FollowingPosts}
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile/:username" component={Profile} />
                <Route component={ServerError} />
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
