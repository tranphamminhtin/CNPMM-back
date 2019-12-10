var controller = require('../controllers/sanpham');
var authMiddleware = require('../controllers/auth');

module.exports = function (express) {

    var router = express.Router();

    // list sản phẩm
    router.get('/', controller.getList);

    // thêm sản phẩm
    router.post('/', authMiddleware.verify, controller.add);

    router.route('/:model_id')
        //lấy sản phẩm
        .get(controller.search)
        // sửa sản phẩm
        .put(authMiddleware.verify, controller.update)
        // xóa sản phẩm
        .delete(authMiddleware.verify, controller.delete);
    return router;
};

