var controller = require('../controllers/khachhang');
var authMiddleware = require('../controllers/auth');

module.exports = function (express) {

    var router = express.Router();

    // list 
    router.get('/', authMiddleware.verify, controller.getList);

    // thêm 
    router.post('/', controller.add);
    router.route('/:username')
        .get(authMiddleware.verify, controller.search)
        .put(authMiddleware.verify, controller.update)
        .delete(authMiddleware.verify, controller.delete);
    return router;
};