const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const connectToMongo = require('./db/connection');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes')
const signRoutes = require('./routes/signRoutes');

const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.NODE_LOCAL_TEST_PORT : process.env.NODE_LOCAL_PORT;

// Log environment variables to verify
// console.log('Environment Variables:');
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`NODE_LOCAL_PORT: ${process.env.NODE_LOCAL_PORT}`);
// console.log(`MONGODB_USER: ${process.env.MONGODB_USER}`);
// console.log(`MONGODB_PASSWORD: ${process.env.MONGODB_PASSWORD}`);
// console.log(`MONGODB_DATABASE: ${process.env.MONGODB_DATABASE}`);
// console.log(`DB_HOST: ${process.env.DB_HOST}`);
// console.log(`DB_PORT: ${process.env.DB_PORT}`);
// console.log(`TEST_DB_HOST: ${process.env.TEST_DB_HOST}`);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'meow',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true when usin HTTPS
}));

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Root route to handle redirection
app.get('/', (req, res) => {
  if (req.session && req.session.admin) {
    res.redirect('/admin/dashboard');
  } else if (req.session && req.session.customer) {
    res.redirect('/customer/home');
  } else {
    res.redirect('/signin');
  }
});

// Sign in Routes
app.use('/', signRoutes);

// Admin Routes
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes); 


// Serve static files (this should be after  routes to avoid conflicts otherwise html files will render m)
app.use(express.static(path.join(__dirname, 'public')));

// Catch all route to render 404 page
// app.use((req, res) => {
//   res.status(404).render('404');
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
