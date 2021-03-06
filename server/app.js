var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var spawn = require("child_process").spawn;
var fs = require('fs');


var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './');
	},
	filename: function (req, file, callback) {
		callback(null, 'file.jpg');
	}
});

var upload = multer({storage: storage}).single('file');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/client/'));

app.post('/classify', function(req, res) {
	var args = ['diagnosis.py'];
	var arr = req.body.values;
	//console.log(arr);
	arr.forEach(function(entry) {
	    args.push(entry);
	});
	//console.log(args);
	var pythonProcess = spawn('python', args);
	pythonProcess.stdout.on('data', (data) => {
			message = data.toString();
			console.log(message);
			res.status(200).send({message: message});
	});
})

app.post('/uploadImg', function(req, res){
  upload(req, res, function(err) {
		if(err){
			console.log(err);
			res.status(400);
			res.end();
		}
  })
	var pythonProcess = spawn('python', ['tens.py']);
	fs.readFile('result.txt', (err, data) => {
    if (err) throw err;
    res.send(data.toString());
	})
	// pythonProcess.stdout.on('data', (data) => {
	// 		message = data.toString();
	// 		console.log(message);
	// 		res.status(200).send({message: message});
	// });
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port: ' + 3000);
});
