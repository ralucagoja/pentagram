"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Register = React.createClass({
    render: function () {
        /*var styles = {
            background: '#7A3C3C',
        };*/
        return (
        	<div className="text-center">
            <form>
            <h2> Register form </h2>
            <br />
            <input type="text" placeholder="Enter your name"/> <br />
            <br />
            <input type="password" placeholder="Enter your pass"/> <br />
            <br />
            <input type="password" placeholder="Re-enter your pass"/> <br />
            <br />
            <input type="mail" placeholder="Enter your e-mail"/> <br />
            <br />
            <input type="submit" value="Register"/>
            </form>
            </div>
        );
    }
});
module.exports = Register;