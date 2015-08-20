var mongoose = require('mongoose');
	mongoose.connect("mongodb://localhost/library");
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(callback) {
    // yay!
    console.log("db has open");
});
var Keywords=new mongoose.Schema({
	keyword:String
});
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords:[Keywords]
});
var BookModel = mongoose.model('Book', Book);
	module.exports = BookModel;