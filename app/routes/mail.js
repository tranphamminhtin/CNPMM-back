var mailController = require('../controllers/mail');
var authMiddleware = require('../controllers/auth');

module.exports = function (express) {
    var router = express.Router();

    router.get('/', function (req, res) {
        res.json('API mail');
    });

    router.post('/', authMiddleware.verify, mailController.sendMail);

    return router;
};