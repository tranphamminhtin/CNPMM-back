var Model = require('../models/khachhang');
var User = require('../models/user');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.add = function (req, res) {
    Model.create(req.body, function (err, model) {
        if (err) {
            if (err.code === 11000)
                return res.json({ success: false, message: 'ten da ton tai' });
            return res.json({ success: false, message: err });
        }
        return res.json({ success: true, message: 'Tạo thành công' });
    });
};

module.exports.search = function (req, res) {
    Model.findOne({ username: req.params.username }).exec(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if(!model) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: model });
    });
};

module.exports.update = function (req, res) {
    Model.findOne({ username: req.params.username }).exec(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (!model) return res.json({ success: false, message: 'Không có người dùng' });
        Model.findByIdAndUpdate(model._id, {
            $set: req.body
        }, { new: true }, function (err, model) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Sửa thành công' });
        })
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        username: req.params.username
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        User.remove({
            username: req.params.username
        }, function (err, user) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Xóa thành công' });
        });
    });
};