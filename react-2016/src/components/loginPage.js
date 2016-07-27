"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
    getInitialState: function() {
          return {
                username: null
            ,
               password: null
          };
        },
        userChangeHandler: function(event) {
            this.setState({username: event.target.value});
        },
        passwordChangeHandler: function(event) {
            this.setState({password: event.target.value});
        },
        formSubmitHandler: function(event) {
            event.preventDefault();
            console.log(this.state);
            $.ajax({
              url: 'http://127.0.0.1:8000/api/v1/login/'
              , type: 'POST'
              , data: this.state
            }).then(function(data) {
              sessionStorage.setItem('authToken', data.token);
              //redirect to homepage
            });
        },

    render: function () {
        return (
                <div className="text-center">
                <form>
                    <br />
                    <h2>Login form</h2>
                    <input type="text" name="username" placeholder="Enter your name" onChange={this.userChangeHandler}/><br/>
                    <br />
                    <input type = "password" placeholder="Enter your pass" onChange={this.passwordChangeHandler}/>< br />
                    <br />
                    <input type="submit" className="button" value="login" onClick={this.formSubmitHandler}/>
                    <Link to="register">
                    <input type="button" className="button" value="register "/>
                    </Link>
                </form>
                </div>
        );
    }
});
module.exports = Login;