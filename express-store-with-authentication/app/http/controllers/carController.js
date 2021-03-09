const Controller = require('./controller');
const cars = require('app/models/carsInfo.json');

class CarController extends Controller {
  getCar(req, res) {
    const id = req.params.id;
    const car = cars.find((item, index) => {
      return item.id == id;
    });
    res.render('singleCar', { car, messages: req.flash() });
  }

  postSearch(req, res, next) {
    const search = req.body.search.trim();
    if (!search) {
      return res.redirect('/');
    }
    let carArr = [];
    cars.find((item, index) => {
      if (
        item.title.includes(search) ||
        item.color.includes(search) ||
        item.year.includes(search)
      ) {
        carArr.push(item);
      }
    });
    if (carArr.length !== 0) {
      return res.render('home', { cars: carArr, messages: req.flash() });
    }
    return res.redirect('/home');
  }
}

module.exports = new CarController();
