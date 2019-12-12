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

import { isAuthenticated } from './services/auth';

import AdminLayout from './layouts/Admin/Admin';
import Login from './views/Login';
import Icons from './views/Icons';

import 'react-toastify/dist/ReactToastify.css';

import './assets/scss/black-dashboard-react.scss';
import './assets/demo/demo.css';
import './assets/css/nucleo-icons.css';

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    path="/admin"
    render={props =>
      isAuthenticated() ? (
        <AdminLayout {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/icons" exact component={Icons} />
        <PrivateRoute />
        <Redirect
          from="/"
          render={props =>
            isAuthenticated() ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
