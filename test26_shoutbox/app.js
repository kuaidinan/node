var express = require('express'),
    app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var register = require('./routes/register.js');
var login = require('./routes/login.js');
var menu = require('./routes/menu.js');

var messages = require('./lib/message.js');
var user = require('./lib/middleware/user.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}));
app.use(express.static(__dirname+'/public'));

app.use(user);
app.use(messages);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',menu.form);

app.get('/register',register.form);
app.post('/register',register.submit);

app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);

app.listen('3000',function(err){
  if (err) throw err;
  console.log('port is %s',3000);
})