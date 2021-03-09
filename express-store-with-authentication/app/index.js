const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);

class Application {
  constructor() {
    this.setupExpressServer();
    this.setMongodb();
    this.setConfigModules();
    this.setRoutes();
  }

  setupExpressServer() {
    app.listen(3000, () => console.log('listen to port 3000'));
  }

  setMongodb() {
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
    mongoose
      .connect('mongodb://localhost/hw14', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((result) => console.log('connect !'))
      .catch((err) => console.log('connect to Mongodb failed !' + err));
    app.use(
      session({
        secret: 'mysecretKey',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
          uri: 'mongodb://localhost/hw14',
          collection: 'session',
        }),
      })
    );
    app.use(flash());
  }
  setConfigModules() {
    app.use(express.static('public'));
    app.set('view engine', 'ejs');
    app.set('views', path.resolve('./resource/views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      res.locals.isLoggedIn = req.session.isLoggedIn;
      res.locals.path = req.url;
      res.locals.user = req.session.user;
      next();
    });
  }

  setRoutes() {
    app.use(require('./routes/web'));
  }
}

module.exports = Application;
