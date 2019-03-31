var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');

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
  var data = req.body.symptoms;
  console.log(data);
	//send data back after python  script on array
	//check take in array
	//sys std.out flush
	var pythonProcess = spawn('python',["diagnosis.py", data);
					pythonProcess.stdout.on('data', (data) => {
							message = data.toString();
							res.status(200).send({id: req.body.id, message: message});
					});
  res.send(data);
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
