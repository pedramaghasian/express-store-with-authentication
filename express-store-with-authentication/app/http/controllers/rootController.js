const Controller = require('./controller');

class RootController extends Controller {
  getRoot(req, res) {
    res.render('root', { messages: req.flash() });
  }
}

module.exports = new RootController();
