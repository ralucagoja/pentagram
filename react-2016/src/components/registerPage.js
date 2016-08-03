"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Register = React.createClass({
    getInitialState: function() {
          return {
                username: null
            ,   
            password: null
            ,   
            passwordRepeat: null
            ,   
            email: null
          };
        },
        userChangeHandler: function(event) {
            this.setState({username: event.target.value});
        },
        passwordChangeHandler: function(event) {
            this.setState({password: event.target.value});
        },
        passwordRepeatChangeHandler: function(event) {
            this.setState({passwordRepeat: event.target.value});
        },
        emailChangeHandler: function(event) {
            this.setState({email: event.target.value});
        },
        formSubmitHandler: function(event) {
            event.preventDefault();
            console.log(this.state);
            $.ajax({
              url: 'http://127.0.0.1:8000/api/v1/users/'
              , type: 'POST'
              , data: this.state
            }).then(function(data) {
              sessionStorage.setItem('authToken', data.token);
              Router.HashLocation.push("pentalog");
              //redirect to homepage
            });
        },
    render: function () {
        return (
                <div className="text-center">
                <form>
                <h2> Create a new account :) </h2>
                <br />
                <input type="text" placeholder="Enter your name" onChange={this.userChangeHandler}/> <br />
                <br />
                <input type="password" placeholder="Enter your pass" onChange={this.passwordChangeHandler}/> <br />
                <br />
                <input type="password" placeholder="Re-enter your pass" onChange={this.passwordRepeatChangeHandler}/> <br />
                <br />
                <input type="email" placeholder="Enter your e-mail" onChange={this.emailChangeHandler}/> <br />
                <br />
                <input type="submit" className="button" value="Register" onClick={this.formSubmitHandler}/>
                </form>
                </div>  
        );
    }
});
module.exports = Register;