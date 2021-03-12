
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
// var expressSession = require('express-session');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');

/**
 * route controllers
 */
var index = require('./routes/index');
var calculator = require('./routes/calculator');
var rates = require('./routes/rates');
var mypackages = require('./routes/mypackages');


var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');
// app.use(express.favicon());
// terminal logger currently disabled
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(cookieParser('IxD secret key'));
app.use(express.static(path.join(__dirname, 'public')));

// express session deprecated 
// app.use(expressSession());

// router deprecated in express 4
// app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/**
 * express routes
 */
app.get('/', index.view);
// app.get('/login', index.loginInfo);
app.get('/calculator', calculator.view);
app.post('/calculate', calculator.calculate);
app.get('/rates', rates.view);
app.get('/mypackages', mypackages.view);
app.post('/addpackage', mypackages.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
