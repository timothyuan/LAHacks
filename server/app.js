var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var spawn = require("child_process").spawn;

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, '../');
	},
	filename: function (req, file, callback) {
		//console.log("looool")
		callback(null, 'file.jpeg');
		//console.log("here's why")
	}
});

var upload = multer({storage: storage}).single('file');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/client/'));

app.post('/classify', function(req, res) {
	var args = ["diagnosis.py"];
	var arr = req.body.values;
	//console.log(arr);
	arr.forEach(function(entry) {
	    args.push(entry);
	});
	console.log(args);
	var pythonProcess = spawn('python', args);
	pythonProcess.stdout.on('data', (data) => {
			message = data.toString();
			console.log(message);
			res.status(200).send({message: message});
	});
})

app.post('/uploadImg', function(req, res){
  //console.log("but why")
  upload(req, res, function(err) {
        //qs: { q:isAllowed}}, function(err, response, body){
  res.status(200).send("success");
  })
  //res.status(500).send(req.body.values)
  //res.send("success");
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port: ' + 3000);
});
