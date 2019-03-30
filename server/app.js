var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/classify', function(req, res) {
  var data = req.body.values;
  console.log(data);
  res.send(data);
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port: ' + 3000);
});
