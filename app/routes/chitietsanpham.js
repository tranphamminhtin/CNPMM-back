var controller = require('../controllers/chitietsanpham');
var authMiddleware = require('../controllers/auth');

module.exports = function (express) {

    var router = express.Router();

    // list 
    router.get('/', controller.getList);

    // thêm 
    router.post('/', authMiddleware.verify, controller.add);
    router.route('/:model_id')
        .get(controller.search)
        .put(authMiddleware.verify, controller.update)
        .delete(authMiddleware.verify, controller.delete);
    router.route('/product/:productId')
        .get(controller.getDetailProduct);
    return router;
};