var Model = require('../models/nhanvien');
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
                return res.json({ success: false, message: 'mã nhân viên tồn tại' });
            return res.json({ success: false, message: err });
        }
        return res.json({ success: true, message: 'Tạo thành công' });
    });
};

module.exports.search = function (req, res) {
    Model.findOne({
        username: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (!model) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: model });
    })
};

module.exports.update = function (req, res) {
    Model.update({
        username: req.params.model_id
    }, { $set: req.body }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (!model) return res.json({ success: false, message: 'Trống' });
        User.findOne({ username: req.params.model_id }, function (err, user) {
            if (err) return res.json({ success: false, message: err });
            if (!model) return res.json({ success: false, message: 'Trống' });
            if (req.body.password) {
                user.password = req.body.password;
                user.save(function (err) {
                    if (err) return res.json({ success: false, message: err });
                });
            }
        });
        return res.json({ success: true, message: 'Sửa thành công' });
    })
};

module.exports.delete = function (req, res) {
    Model.remove({
        username: req.params.model_id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        User.remove({
            username: req.params.model_id
        }, function (err, user) {
            if (err) return res.json({ success: false, message: err });
            return res.send({ success: true, message: 'Xóa thành công' });
        });
    });
};