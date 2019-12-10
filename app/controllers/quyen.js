var Model = require('../models/quyen');
var Employee = require('../models/nhanvien');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: model});;
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
        $set: req.body
    }, { new: true }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({success: true, message: 'Sửa thành công'});
    });
};

module.exports.delete = function (req, res) {
    Employee.update({ rightId: req.params.model_id }, { rightId: '' }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        Model.remove({
            _id: req.params.model_id
        }, function (err, model) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Xóa thành công' });
        });
    });

};