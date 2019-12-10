var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KhachHangSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    email: { type: String, required: true },
    numberPhone: { type: String },
    address: { type: String },
});
module.exports = mongoose.model('KhachHang', KhachHangSchema);