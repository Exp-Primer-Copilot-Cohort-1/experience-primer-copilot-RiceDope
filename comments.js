// Create web server
var express = require('express');
var app = express();
var comments = require('./comments.json');
var bodyParser = require('body-parser');
var fs = require('fs');

// use body parser to parse JSON body
app.use(bodyParser.json());

// get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// get comment by id
app.get('/comments/:id', function(req, res) {
    // find comment by id
    var comment = comments.filter(function(comment) {
        return comment.id == req.params.id;
    });
    // return comment
    if(comment.length) {
        res.json(comment[0])
    } else {
        res.status(404).json({error: 'comment not found'});
    }
});

// add comment
app.post('/comments', function(req, res) {
    // get last id
    var lastId = comments[comments.length-1].id;
    // increment id
    var newId = lastId + 1;
    // create new comment object
    var newComment = {
        id : newId,