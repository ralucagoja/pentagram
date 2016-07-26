"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
    render: function () {
        var styles = {
            background: '#7A3C3C',
        };
        return (
            <div className="text-center">
            <form>
            <h2>Login form</h2>
            <input type="text" placeholder="Enter your name"/><br/>
            <br />
            <input type = "password" placeholder="Enter your pass" />< br />
            <br />
            <input type="submit" value="login"/>
            <Link to="register">
            <input type="button" value="register"/>
            </Link>
            </form>
            </div>
        );
    }
});
module.exports = Login;