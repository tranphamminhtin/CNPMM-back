var Model = require('../models/donhang');
var Detail = require('../models/chitietdonhang');

module.exports.getList = function (req, res) {
    Model.find({ state: { $ne: 'gio' } }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: model});
    });
};

module.exports.add = function (req, res) {
    Model.create(req.body, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
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
        state: req.body.state
    }, { new: true }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: 'Sửa thành công'});
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        _id: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        Detail.remove({
            orderId: req.params.model_id
        }, function (err, detail) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Xóa thành công' });
        });
    });
};

module.exports.getOrderUsername = function (req, res) {
    Model.find({username: req.params.username}, function(err, model){
        if(err) return res.json({success: false, message: err});
        return res.json({success: true, message: model});
    });
};
