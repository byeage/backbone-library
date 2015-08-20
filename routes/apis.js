var express = require('express');
var router = express.Router();
var BookModel = require('../models/book.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/books', function(req, res) {
    return BookModel.find(function(err, books) {
        if (!err) {
            return res.send(books);
        } else {
            return console.log(err);
        }
    });
});
router.post('/books', function(req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    });
    book.save(function(err) {
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(book);
});
router.get('/books/:id', function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        if (!err) {
            return res.send(book);
        } else {
            return console.log(err);
        }
    });
});
router.put('/books/:id', function(req, res) {
    console.log('updating book' + req.body.title);
    return BookModel.findById(req.params.id, function(err, book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        book.keywords = req.body.keywords;
        return book.save(function(err) {
            if (!err) {
                console.log('book updated');
            } else {
                console.log(err);
            }
            return res.send(book);
        });
    });
});

router.delete('/books/:id', function(req, res) {
    console.log('Deleting book with id: ' + req.params.id);
    return BookModel.findById(req.params.id, function(err, book) {
        return book.remove(function(err) {
            if (!err) {
                console.log('Book removed');
                return res.send('success remove');
            } else {
                console.log(err,"has delete");
            }
        });
    });
});


module.exports = router;