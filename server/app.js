var express = require('express');
var app = express();

app.get('/classify', function(req, res) {
  res.send('works');
})

app.listen(3000, function() {
    console.log('Listening to port: ' + 3000);
});
