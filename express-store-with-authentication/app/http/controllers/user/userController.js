const Controller = require('../controller');
const User = require('app/models/user');

class UserController extends Controller {
  getUser(req, res) {
    const username = req.params.username;
    User.findOne({ username }).then((user) => {
      if (!user) {
        req.flash('errors', 'کاربر مورد نظر یافت نشد');
        return res.redirect('/auth/register');
      }
      return res.render('user/profile', { user, messages: req.flash() });
    });
  }

  postEdit(req, res) {
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        const oldPass = user.password;
        if (!user) {
          req.flash('errors', 'کاربر مورد نظر یافت نشد');
          return res.redirect('/auth/register');
        }
        user.username = req.body.username;
        user.email = req.body.email;
        user.gender = req.body.gender === 'جنسیت' ? 'male' : req.body.gender;
        user.password = req.body.password;
        return user
          .save()
          .then((result) => {
            if (oldPass !== user.password) {
              return req.session.destroy((err) => {
                return res.redirect('/auth/login');
              });
            }
            req.flash('success', 'تغییرات با موفقیت ذخیره شد');
            return res.redirect(`/user/${user.username}`);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new UserController();
