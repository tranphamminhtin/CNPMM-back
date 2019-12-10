var controller = require('../controllers/user');
var authMiddleware = require('../controllers/auth');


// module.exports = function (express, passport) {
module.exports = function (express) {
    var router = express.Router();

    router.post('/login/:right', controller.login);

    // //Login with Facebook
    // router.get('/fb', passport.authenticate('facebook', { scope: ['email'] }));
    // router.get('/fb/callback', passport.authenticate('facebook'), function (req, res) {
    //     if (!req.user) return res.redirect('http://localhost:4200/dang-nhap');

    //     return res.redirect('http://localhost:4200/loading?state=fb&id=' + req.user.facebookId);
    // });
    // router.get('/fb/:id', controller.fb);

    // //Login with Google
    // router.get('/gg', passport.authenticate('google', { scope: ['profile', 'email'] }));
    // router.get('/gg/callback', passport.authenticate('google'), function (req, res) {
    //     if (!req.user) return res.redirect('http://localhost:4200/dang-nhap');
    //     return res.redirect('http://localhost:4200/loading?state=gg&id=' + req.user.googleId);
    // });
    // router.get('/gg/:id', controller.gg);

    router.post('/facebook', authMiddleware.verifySocialToken, controller.fb);
    router.post('/google', authMiddleware.verifySocialToken, controller.gg);



    ////////////////////
    router.get('/', authMiddleware.verify, function (req, res) {
        return res.json({ success: true, message: 'hooray! welcome to our api!', data: req.user });
    });
    router.route('/users')

        .post(controller.add)

        .get(authMiddleware.verify, controller.getList);

    router.route('/users/:username')

        .get(authMiddleware.verify, controller.search)

        .put(authMiddleware.verify, controller.update)

        .delete(authMiddleware.verify, controller.delete);

    return router;
};

