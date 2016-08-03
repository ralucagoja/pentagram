"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Pentalog = React.createClass({

getInitialState: function(){
            return {
                images: [{
                    "id": 2,
                    "user": 2,
                    "photo": "photos/user_raluca/7f64ac54-4a5d-11e6-9170-ace0105093c9_Old-Sailboat-Sunset-1600x900.jpg "
                }]
            };
    },

    componentWillMount: function() {
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/photos/'
            , type: 'GET'
            , error: function(xhr, textStatus, errorThrown) {

            }
        }).then(function(data) {
            self.setState({images: data});
        });
    }

    , onCommentHandler: function(event) {
        var photoId = event.target.dataset.id;
        Router.HashLocation.push('photo/' + photoId);
    }
    , render: function() {
        var self = this;

        var tokenNumber = sessionStorage.getItem("authToken");
        if (!tokenNumber) {
            Router.HashLocation.push("login");
        }

        return (
            <div className="row image-gallery-bg">
                <div className="col-md-12">
                    
                        {self.state.images.map(function(item) {
                            return (
                                <div className="row image-gallery-view">
                                <div className="image-block" key={item.id} >
                                    <a href={'#/photo/' + item.id}>
                                        <img src = {'http://127.0.0.1:8000' + item.photo} id = {'image-' + item.id} data-id = {item.id} width = "100%" height = "100%" />
                                    </a>
                                    <div className='img-caption'>
                                        <div className='img-caption-divs'>
                                            <a href="">
                                                <i className='material-icons my-img-like-icon left' >comment</i>
                                                &nbsp;
                                            </a>
                                        </div>
                                         <div className='img-caption-divs'>
                                            <a href="">
                                                <i className='material-icons my-img-like-icon right' >thumb_up</i>
                                                &nbsp;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            );
                        })}
                    
                </div>
            </div>
        );
    }
});

module.exports = Pentalog;