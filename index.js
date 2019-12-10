var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');    // get body-parser
var morgan = require('morgan');         // used to see requests
var mongoose = require('mongoose');
var config = require('./config');
// var passport = require('passport');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
   origin: ['https://localhost:4200', 'https://127.0.0.1:4200']
}));
app.use(require('express-session')({ secret: 'cnpmm', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// require('./passport')(passport);

// configure our app to handle CORS requests
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,  Access-Control-Request-Headers');
   next();
});

// log all requests to the console 
app.use(morgan('dev'));
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
   useNewUrlParser: true
}).then(() => {
   console.log('Database sucessfully connected')
},
   error => {
      console.log('Database could not connected: ' + error)
   }
);
// mongoose.Promise = global.Promise;
// mongoose.connect(config.database, { useNewUrlParser: true }); 
// mongoose.set('useCreateIndex', true);

// ROUTES FOR OUR API =================
// ====================================
app.get('/', function (req, res) {
   res.json({data:'worked', user: req._token, asd:'1', sd: req.user});
});
// API ROUTES ------------------------
var chitietdonhangRoutes = require('./app/routes/chitietdonhang')(express);
var chitietsanphamRoutes = require('./app/routes/chitietsanpham')(express);
var donhangRoutes = require('./app/routes/donhang')(express);
var khachhangRoutes = require('./app/routes/khachhang')(express);
var nhanvienRoutes = require('./app/routes/nhanvien')(express);
var quyenRoutes = require('./app/routes/quyen')(express);
var sanphamRoutes = require('./app/routes/sanpham')(express);
// var userRoutes = require('./app/routes/user')(express, passport);
var userRoutes = require('./app/routes/user')(express);
var mailRoutes = require('./app/routes/mail')(express);
app.use('/detail-order', chitietdonhangRoutes);
app.use('/detail-product', chitietsanphamRoutes);
app.use('/order', donhangRoutes);
app.use('/client', khachhangRoutes);
app.use('/employee', nhanvienRoutes);
app.use('/right', quyenRoutes);
app.use('/product', sanphamRoutes);
app.use('/user', userRoutes);
app.use('/mail', mailRoutes);
// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Dang dung Port: ' + config.port);