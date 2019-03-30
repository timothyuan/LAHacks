var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/client/'));

app.post('/classify', function(req, res) {
  var data = req.body.values;
  console.log(data);
  res.send(data);
})

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port: ' + 3000);
});
