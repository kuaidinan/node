var express = require('express'),
    app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var messages = require('./lib/message.js');
var user = require('./lib/middleware/user.js');
var validate = require('./lib/middleware/validate.js');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');

var register = require('./routes/register.js');
var login = require('./routes/login.js');
var menu = require('./routes/menu.js');
var entries = require('./routes/entries');

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

var api = require('./routes/api.js');
app.use('/api',api.auth);// api 凭证
app.use(user);
app.use(messages);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

// app.get('/',page(Entry.count,2),entries.list);
app.get('/post',entries.form);
app.post('/post',validate.required('title'),validate.lengthAbove('title',2),entries.submit);

app.get('/register',register.form);
app.post('/register',register.submit);

app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);

app.get('/:page?',page(Entry.count,2),entries.list);

app.get('/api/user/:id',api.user);

app.listen('3000',function(err){
  if (err) throw err;
  console.log('port is %s',3000);
})
