"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = require('react-router').RouteHandler;
var Input = require('./common/textInput');
var Pentalog = React.createClass({

getInitialState: function(){
            return {
                images: [{
                    "id": 2,
                    "user": 2,
                    "photo": "photos/user_raluca/7f64ac54-4a5d-11e6-9170-ace0105093c9_Old-Sailboat-Sunset-1600x900.jpg "
                }],
                likes: '',
                comments: [],
                fetchComments: false
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
          $.ajax({
            url: 'http://127.0.0.1:8000/api/photos/' + '1' + '/like/'
            , type: 'GET'
            , error: function (xhr, textStatus, errorThrown) {
            }
        }).then(function (likesData) {
            console.log(likesData);
            self.setState({likes: likesData});
        });
    }

    , onCommentHandler: function(event) {
       // var photoId = event.target.dataset.id;
       // Router.HashLocation.push('photo/' + photoId);
       this.setState({comment: event.target.value});
    }
    , 

     onLikeHandler: function (event) {
        console.log('Like/Unlike button was pressed!');
        var token = sessionStorage.getItem("authToken");
        var user = sessionStorage.getItem("id");
        var photoId = event.target.dataset.id;
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Token ' + token);
            },
            url: 'http://127.0.0.1:8000/api/photos/' + photoId + '/like/'
            , type: 'POST'
        });

    },
     onCommentSubmitHandler: function (event) {
        event.preventDefault();
        console.log(this.state);
        var photoId = event.target.dataset.id;
        if (this.state.comment == null) {
            console.log("comment null");
        } else {
            var token = sessionStorage.getItem("authToken");
            //this.setState({user: sessionStorage.getItem("id")});
            $.ajax({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Token ' + token);
                },
                url: 'http://127.0.0.1:8000/api/photos/' + photoId + '/comments/'
                , type: 'POST'
            });
        }
    },
    showComments: function (event) {
        var photoId = event.target.dataset.id;
        var self = this;
        $.ajax({
            url: 'http://127.0.0.1:8000/api/photos/' + photoId + '/comments/'
            , type: 'GET'
            , error: function (xhr, textStatus, errorThrown) {
            }
        }).then(function (commentData) {
            self.setState({comments: commentData});
        });
        this.setState({
            fetchComments: true
        });
    },

    render: function() {
        var self = this;

        var likeHandle = this.onLikeHandler;
        var commentHandle = this.onCommentHandler;
        var commentSubmitHandle = this.onCommentSubmitHandler;
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
                                            <a onClick={self.showComments}>
                                                <i className='material-icons my-img-like-icon left' >comment</i>
                                                &nbsp;
                                            </a>
                                        </div>
                                         <div className='img-caption'>
                                          <div className='img-caption-divs'>
                                            <a onClick={likeHandle}>
                                                <i className='material-icons my-img-like-icon right' >thumb_up</i>
                                                &nbsp;
                                            </a>
                                            </div>
                                        </div>
                                         <div className="card-reveal">
                                                <p>
                                                    {self.state.comments.map(function (commItem) {
                                                        return (
                                                            <div className="left-align">
                                                                <p>
                                                                    <div className="chip">{commItem.user}</div>
                                                                    {commItem.comment}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </p>
                                                <p><input placeholder="Comment"
                                                          name="comment"
                                                          inputChangeHandler={commentHandle}/>
                                                </p>
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