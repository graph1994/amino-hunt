//Modules Needed!
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');

//Config DB file of Stock symbols using mongoose as ORM
//I setup a mongodb server on mongolabs that host the data need for this application.
mongoose.connect("mongodb://graff:password@ds033875.mongolab.com:33875/stock_symbols", function(err, db) {
	if(!err) {
	    console.log("We are connected");
	}
	else{
	    //If it can connect alert the user!
	    alert("Could not connect to MongoLabs!")
		}
    });

//Setup the Stock schema
var Schema = mongoose.Schema;

//Very basic schema model outline for the fields of each stock
var stockSchema = new Schema({
	Symbol:String,
	Name:String,
	Sector:String,
	Industry:String
    });
//Define the model based on schema, set the collection
var Stock = mongoose.model('Stock', stockSchema,'stock_list');
module.exports = Stock;


//Restful Endpoint that will return all stocks when called
app.get('/stock', function (req, res) {
	return Stock.find(function (err, stocks) {
		if (!err) {
		    return res.send(stocks);
		} else {
		    return console.log(err);
		}
	    });
    });
//Set the port to localhost:8080!
var port = process.env.PORT || 8000;

//directory that has my index.html!
app.use(express.static(__dirname + '/public'));


app.listen(port);

console.log('Stock App is live on Port localhost:' + port);

exports = module.exports = app;