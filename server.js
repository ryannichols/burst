var express = require('express');
var config = require('./config');
var Handlebars = require('hbs');

function authorize(req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'slivertv' && user.pass === 'Starving123') {
    return next();
  } else {
    return unauthorized(res);
  };
};

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

var app = express();
app.set('port', (process.env.PORT || config.server.port));
app.use(express.static(__dirname + config.server.distPath));
app.set('views', __dirname + config.server.viewPath);
app.set('view engine', 'hbs');

app.get('/', function(request, response) {
  response.render(config.server.entryView);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});