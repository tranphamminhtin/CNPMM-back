var Model = require('../models/sanpham');
var Detail = require('../models/chitietsanpham');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: model});
    });
};

module.exports.add = function (req, res) {
    Model.create(req.body, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Tạo thành công' });
    });
};

module.exports.search = function (req, res) {
    Model.findById(req.params.model_id, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if(!model) return res.json({ success: false, message: 'Trống' });
        return res.json({success: true, message: model});
    });
};

module.exports.update = function (req, res) {
    Model.findByIdAndUpdate(req.params.model_id, {
        promotion: req.body.promotion,
        price: req.body.price,
        image: req.body.image,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4
    }, { new: true }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        res.json({success: true, message: model});
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        _id: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        Detail.remove({
            productId: req.params.model_id
        }, function (err, detail) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Xóa thành công' });
        });
    });
};