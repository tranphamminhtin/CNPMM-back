var Model = require('../models/chitietsanpham');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: model});
    });
};

module.exports.add = function (req, res) {
    Model.findOne({
        productId: req.body.productId,
        size: req.body.size
    }).exec(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (model) {
            model.amount += req.body.amount;
            model.save(function (err) {
                if (err) return res.json({ success: false, message: err });
            });
            return res.json({ success: true, message: model });
        } else {
            Model.create(req.body, function (err, model) {
                if (err) return res.json({ success: false, message: err });
                return res.json({ success: true, message: model._id });
            });
        }
        
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
        amount: req.body.amount
    }, function (err, model) {
        if(err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Sửa thành công' });
    })
};

module.exports.delete = function (req, res) {
    Model.remove({
        _id: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Xóa thành công' });
    });
};

module.exports.getDetailProduct = function (req, res) {
    Model.find({ productId: req.params.productId, amount: { $gt: 0 } }, "size amount", function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: model});
    });
}