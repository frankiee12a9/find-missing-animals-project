import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import { Router } from 'react-router-dom';
import { store } from './app/store/storeConfig';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css';

// Note: currently using react-router-dom v6
// comparison: https://dev.to/arunavamodak/react-router-v5-vs-v6-dp0
// Note: share post to other SNS platform using https://www.npmjs.com/package/react-share
export const history: History = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
