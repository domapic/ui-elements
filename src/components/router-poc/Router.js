import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Breadcrumbs from "components/breadcrumbs";

const Base = () => (
  <Breadcrumbs
    sections={[
      {
        text: "Base"
      }
    ]}
  />
);

const SubRoute = () => (
  <Breadcrumbs
    sections={[
      {
        text: "Base",
        url: "/"
      },
      {
        text: "SubRoute",
        url: "/subroute"
      }
    ]}
  />
);

const SubSubRoute = () => (
  <Breadcrumbs
    sections={[
      {
        text: "Base",
        url: "/"
      },
      {
        text: "SubRoute",
        url: "/subroute"
      },
      {
        text: "SubRoute",
        url: "/subroute/subroute"
      }
    ]}
  />
);

export const MainRouter = ({ match }) => (
  <div>
    <ul>
      <li>
        <Link to={match.path}>Base route</Link>
      </li>
      <li>
        <Link to={`${match.path}subroute`}>Subroute</Link>
      </li>
      <li>
        <Link to={`${match.path}subroute/subroute`}>Subroute 2</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path={`${match.path}`} component={Base} />
      <Route exact path={`${match.path}subroute`} component={SubRoute} />
      <Route exact path={`${match.path}subroute/subroute`} component={SubSubRoute} />
    </Switch>
  </div>
);

MainRouter.propTypes = {
  match: PropTypes.any.isRequired
};
