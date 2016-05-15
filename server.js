var express = require('express');
var app = express();
var config = require('./config');
var Handlebars = require('hbs');

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

app.set('port', (process.env.PORT || config.server.port));

app.use(express.static(__dirname + config.server.distPath));

// views is directory for all template files
app.set('views', __dirname + config.server.viewPath);
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render(config.server.entryView);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});