// var jwt        = require('jsonwebtoken');
// var config = require('../../config');
var controller = require('../controllers/quyen');
var authMiddleware = require('../controllers/auth');

module.exports = function (express) {

    var router = express.Router();

    // list quyền
    router.get('/', authMiddleware.verify, controller.getList);

    // thêm quyền
    router.post('/', authMiddleware.verify, controller.add);
    router.route('/:model_id')
        .get(authMiddleware.verify, controller.search)
        .put(authMiddleware.verify, controller.update)
        .delete(authMiddleware.verify, controller.delete);
    return router;
};