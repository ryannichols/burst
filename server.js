var express = require('express');
var app = express();
var config = require('./config');
var Handlebars = require('hbs');

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/static'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


app.get('/', function(request, response) {
  response.render('index');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});