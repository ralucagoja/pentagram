"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/loginPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    // do the redirect if route fails
    <Redirect from="about-us" to="about" />
    <Redirect from="about/*" to="about" />

    <Route name="register" handler={require('./components/registerPage')} />

    <Route name="login" handler={require('./components/loginPage')} />
    <Route name="pentalog" handler={require('./components/pentalogPage')} />
    <Route name="pentalog:photo_id" handler={require('./components/singlePhoto')} />
  </Route>
);

module.exports = routes;