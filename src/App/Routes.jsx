import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Login from 'Login/Login';
import ListProject  from 'ListProject';
// import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/login" />
      {/* <Route path="/authenticate" component={Authenticate} /> */}
      <Route path="/project" component={Project} />
      <Route path="/listproject" component={ListProject} />
      <Route path="/login" component={Login} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
