var Model = require('../models/chitietdonhang');
var Order = require('../models/donhang');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.add = function (req, res) {
    Model.findOne({
        orderId: req.body.orderId,
        productId: req.body.productId,
        size: req.body.size
    }).exec(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (model) {
            model.amount += req.body.amount;
            model.save(function (err) {
                if (err) return res.json({ success: false, message: err });
            });
        } else {
            Model.create(req.body, function (err, model) {
                if (err) return res.json({ success: false, message: err });
            });
        }
        return res.json({ success: true, message: 'Tạo thành công' });
    });
};

module.exports.search = function (req, res) {
    Model.findById(req.params.model_id, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if(!model) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: model });
    });
};

module.exports.update = function (req, res) {
//     // Model.findByIdAndUpdate(req.params.model_id, {
//     //     amount : req.body.amout
//     // }, { new: true }, function (err, model) {
//     //     if (err) return res.json({ success: false, message: err });
//     //     res.json({success: true, message: 'Sửa thành công'});
//     // });
};

module.exports.delete = function (req, res) {
    Model.remove({
        orderId: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Xóa thành công' });
    });
};

module.exports.getOrder = function (req, res) {
    Model.find({ orderId: req.params.orderId }, function (err, model) {
        if (err) return res.json({ success: true, message: err });
        if (!model) return res.json({ success: true, message: 'Giỏ hàng trống' });
        return res.json({ success: true, message: model });
    });
};