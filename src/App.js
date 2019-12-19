/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isAuthenticated } from './services/auth';

import AdminLayout from './layouts/Admin/Admin';
import Login from './views/Login';

import Icons from './views/legacy/Icons';
import Tests from './views/legacy/Tests';
import Typography from './views/legacy/Typography';

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
        <Route path="/legacy/icons" exact component={Icons} />
        <Route path="/legacy/tests" exact component={Tests} />
        <Route path="/legacy/typography" exact component={Typography} />
        <PrivateRoute />
        <ToastContainer autoClose={3000} />
        <Redirect
          from="/"
          to="/"
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
