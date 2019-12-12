/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';

import AdminLayout from './layouts/Admin/Admin';
import Login from './views/Login';
import Icons from './views/Icons';

import 'react-toastify/dist/ReactToastify.css';

import './assets/scss/black-dashboard-react.scss';
import './assets/demo/demo.css';
import './assets/css/nucleo-icons.css';

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" exact component={Login} />

        <Route path="/icons" exact component={Icons} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
