//Modules Needed!
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var PythonShell = require('python-shell');
//Config DB file of Stock symbols using mongoose as ORM
//I setup a mongodb server on mongolabs that host the data need for this application.

var output;


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


//Define the model based on schema, set the collection

app.get('/python',function(req,res){
	var pyshell = new PythonShell('alignment.py', {
								 mode: 'text'
						 });
	output = [];
	//console.log("test")
//	console.log(req.query)
	pyshell.send('G');
pyshell.stdout.on('data', function (data) {
// received a message sent from the Python script (a simple "print" statement)
	console.log(data)
 //output = data;


 	output.push(data)

});
pyshell.end(function (err) {
	return res.send(output)
  if (err) throw err;
  console.log('finished');
});
	//return res.send(output)

});

//Set the port to localhost:8000!
var port = process.env.PORT || 8000;

//directory that has my index.html!
app.use(express.static(__dirname + '/public'));


app.listen(port);

console.log('Animo App is live on Port localhost:' + port);

exports = module.exports = app;
