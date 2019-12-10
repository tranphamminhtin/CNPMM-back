var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NhanVienSchema = new Schema({
    username: {type: String, required: true, index: { unique: true } },
    name: { type: String, },
    email: { type: String, },
    numberPhone: { type: String, },
    rightId: { type: String },
});
// return the model
module.exports = mongoose.model('NhanVien', NhanVienSchema);