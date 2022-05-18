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
import { Route, Switch } from 'react-router-dom';
import { useAppDispatch } from '../store/storeConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '../components/HomePage';
import MapLandingPage from '../utils/MapLandingPage';
import Loading from './Loading';
import PostDetails from '../../features/post/PostDetails';
import TagDetails from '../../features/tags/TagDetails';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import PostUpsert from '../../features/post/PostUpsert';
import Leftbar from './Leftbar';

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
      // perform async dispatch(...) here
      // ex) logged in user related data
      return new Promise((resolve) => resolve(true));
    } catch (err: any) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    initializeApp().then(() => setLoading(false));
  }, [initializeApp]);

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
            <Container sx={{ mt: 4 }}>
              <Switch>
                <Route exact path="/map" component={MapLandingPage} />
                <Route exact path="/posts/:id" component={PostDetails} />
                <Route exact path="/posts/:id/edit" component={PostUpsert} />
                <Route path="/posts/new" component={PostUpsert} />

                <Route exact path="/tags/:id" component={TagDetails} />

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
