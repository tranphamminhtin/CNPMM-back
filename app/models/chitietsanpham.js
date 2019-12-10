var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChiTietSanPhamSchema = new Schema({
    productId: { type: String, required: true },
    size: { type: Number, required: true },
    amount: { type: Number, required: true },
});
// return the model
module.exports = mongoose.model('ChiTietSanPham', ChiTietSanPhamSchema);