import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './Modules/App';
import { Provider } from 'react-redux';
import {store} from './Store/store';
import './Style/style.scss';


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
)
