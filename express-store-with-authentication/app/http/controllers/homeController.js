const Controller = require('./controller');
const cars = require('app/models/carsInfo.json');

class HomeController extends Controller {
  getHome(req, res) {
    res.render('home', { cars, messages: req.flash(), path: '/home' });
  }
}

module.exports = new HomeController();
