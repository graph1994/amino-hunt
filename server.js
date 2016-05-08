//Modules Needed!
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var PythonShell = require('python-shell');
//Config DB file of Stock symbols using mongoose as ORM
//I setup a mongodb server on mongolabs that host the data need for this application.

var output;


app.get('/python',function(req,res){
	var pyshell = new PythonShell('align.py', {
								 mode: 'text'
						 });
	output = [];
	//console.log("test")
//	console.log(req.query)
console.log(req.query.data)
	pyshell.send(req.query.data);
pyshell.stdout.on('data', function (data) {
// received a message sent from the Python script (a simple "print" statement)
	console.log(data.replace(/'/g, '"'))
 //output = data;


 	output = data;
	output = output.replace(/'/g, '"')
});
pyshell.end(function (err) {

	return res.send(output);
  if (err) throw err;
  console.log('finished');
});
	//return res.send(output)

});

//Set the port to localhost:8000!
var port = process.env.PORT || 8001;

//directory that has my index.html!
app.use(express.static(__dirname + '/public'));


app.listen(port);

console.log('Animo App is live on Port localhost:' + port);

exports = module.exports = app;
